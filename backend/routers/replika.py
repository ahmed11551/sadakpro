"""
Professional API routes for bot.e-replika.ru integration
"""
from fastapi import APIRouter, Depends, HTTPException, Query, Body
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field, validator

from services.replika_api import (
    ReplikaAPIClient,
    Donation,
    Fund,
    StatsResponse,
    DonationStatus,
    APIError
)

router = APIRouter()


class DonationCreateRequest(BaseModel):
    """Request model for creating donation"""
    amount: float = Field(gt=0, description="Donation amount")
    fund_id: Optional[int] = None
    fund_name: Optional[str] = None
    currency: str = Field(default="RUB", pattern="^[A-Z]{3}$")
    
    @validator("amount")
    def validate_amount(cls, v):
        if v <= 0:
            raise ValueError("Amount must be greater than 0")
        return round(v, 2)


class DonationResponse(BaseModel):
    """Response model for donation"""
    id: int
    amount: float
    fund_name: str
    fund_id: Optional[int]
    date: datetime
    status: str
    currency: str
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class DonationListResponse(BaseModel):
    """Pagination wrapper for donations"""
    results: List[DonationResponse]
    count: int
    limit: int
    offset: int


async def get_api_client() -> ReplikaAPIClient:
    """Dependency to get API client"""
    async with ReplikaAPIClient() as client:
        yield client


@router.get("/stats", response_model=StatsResponse)
async def get_stats(client: ReplikaAPIClient = Depends(get_api_client)):
    """
    Get platform statistics
    
    Returns comprehensive statistics about donations,
    donors, campaigns, and funds.
    """
    try:
        stats = await client.get_stats()
        return stats
    except APIError as e:
        raise HTTPException(
            status_code=e.status_code or 500,
            detail=e.message
        )


@router.get("/donations", response_model=DonationListResponse)
async def get_donations(
    limit: int = Query(default=10, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    status: Optional[str] = Query(default=None),
    client: ReplikaAPIClient = Depends(get_api_client)
):
    """
    Get list of donations with pagination
    
    - **limit**: Number of results (1-100)
    - **offset**: Pagination offset
    - **status**: Filter by status (pending, completed, failed, refunded)
    """
    try:
        donation_status = None
        if status:
            try:
                donation_status = DonationStatus(status.lower())
            except ValueError:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid status: {status}"
                )
        
        donations = await client.get_donations(
            limit=limit,
            offset=offset,
            status=donation_status
        )
        
        return DonationListResponse(
            results=[
                DonationResponse(**d.dict())
                for d in donations
            ],
            count=len(donations),
            limit=limit,
            offset=offset
        )
        
    except APIError as e:
        raise HTTPException(
            status_code=e.status_code or 500,
            detail=e.message
        )


@router.get("/funds", response_model=List[Fund])
async def get_funds(
    verified_only: bool = Query(default=True),
    client: ReplikaAPIClient = Depends(get_api_client)
):
    """
    Get list of funds
    
    - **verified_only**: Return only verified funds
    """
    try:
        funds = await client.get_funds(verified_only=verified_only)
        return funds
    except APIError as e:
        raise HTTPException(
            status_code=e.status_code or 500,
            detail=e.message
        )


@router.post("/donations/create", response_model=DonationResponse)
async def create_donation(
    request: DonationCreateRequest,
    client: ReplikaAPIClient = Depends(get_api_client)
):
    """
    Create a new donation
    
    - **amount**: Donation amount (must be > 0)
    - **fund_id**: Target fund ID (optional)
    - **fund_name**: Target fund name (optional)
    - **currency**: Currency code (default: RUB)
    """
    try:
        donation = await client.create_donation(
            amount=request.amount,
            fund_id=request.fund_id,
            fund_name=request.fund_name,
            currency=request.currency
        )
        
        return DonationResponse(**donation.dict())
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except APIError as e:
        raise HTTPException(
            status_code=e.status_code or 500,
            detail=e.message
        )


@router.get("/health")
async def health_check(client: ReplikaAPIClient = Depends(get_api_client)):
    """
    Health check endpoint
    
    Verifies connection to bot.e-replika.ru API
    """
    try:
        # Try to get stats as health check
        await client.get_stats()
        return {
            "status": "healthy",
            "api_connected": True,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        return {
            "status": "degraded",
            "api_connected": False,
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }

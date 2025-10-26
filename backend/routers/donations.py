from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models import Donation, User
from schemas import DonationCreate, DonationResponse

router = APIRouter()

@router.post("/donations/init", response_model=DonationResponse)
async def init_donation(
    donation_data: DonationCreate,
    db: AsyncSession = Depends(get_db)
):
    # Create donation
    donation = Donation(
        user_id=1,  # TODO: Get from Telegram WebApp initData
        fund_id=donation_data.fund_id,
        campaign_id=donation_data.campaign_id,
        amount_value=donation_data.amount_value,
        currency=donation_data.currency,
        provider=donation_data.provider,
        status="pending"
    )
    
    db.add(donation)
    await db.commit()
    await db.refresh(donation)
    
    return donation

@router.get("/donations/{donation_id}/status", response_model=DonationResponse)
async def get_donation_status(
    donation_id: int,
    db: AsyncSession = Depends(get_db)
):
    query = select(Donation).where(Donation.id == donation_id)
    result = await db.execute(query)
    donation = result.scalar_one_or_none()
    
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    return donation

@router.post("/payments/webhook/yookassa")
async def yookassa_webhook(
    request: dict,
    db: AsyncSession = Depends(get_db)
):
    # TODO: Implement YooKassa webhook handling
    return {"status": "ok"}

@router.post("/payments/webhook/cloudpayments")
async def cloudpayments_webhook(
    request: dict,
    db: AsyncSession = Depends(get_db)
):
    # TODO: Implement CloudPayments webhook handling
    return {"status": "ok"}


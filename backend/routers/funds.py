from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List
from database import get_db
from models import Fund
from schemas import FundResponse

router = APIRouter()

@router.get("/funds", response_model=List[FundResponse])
async def list_funds(
    country: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(Fund).where(Fund.verified == True)
    
    if country:
        query = query.where(Fund.country_code == country.upper())
    
    result = await db.execute(query)
    funds = result.scalars().all()
    
    if category:
        funds = [f for f in funds if category in (f.categories or [])]
    
    return funds

@router.get("/funds/{fund_id}", response_model=FundResponse)
async def get_fund(
    fund_id: int,
    db: AsyncSession = Depends(get_db)
):
    query = select(Fund).where(Fund.id == fund_id)
    result = await db.execute(query)
    fund = result.scalar_one_or_none()
    
    if not fund:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Fund not found")
    
    return fund


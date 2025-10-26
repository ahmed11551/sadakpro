from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from datetime import datetime
from database import get_db
from models import Donation

router = APIRouter()

@router.get("/me/history")
async def get_my_history(
    type_filter: Optional[str] = Query(None, alias="type"),
    from_date: Optional[str] = Query(None),
    to_date: Optional[str] = Query(None),
    fund_id: Optional[int] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(Donation).where(Donation.user_id == 1)  # TODO: Get from Telegram WebApp initData
    
    if fund_id:
        query = query.where(Donation.fund_id == fund_id)
    
    # TODO: Add date filters
    
    result = await db.execute(query)
    donations = result.scalars().all()
    
    return [
        {
            "id": d.id,
            "date": d.created_at,
            "type": "donation",
            "amount": float(d.amount_value),
            "status": d.status,
            "fund_id": d.fund_id
        }
        for d in donations
    ]

@router.get("/reports/funds")
async def get_fund_reports(
    fund_id: Optional[int] = Query(None),
    from_date: Optional[str] = Query(None),
    to_date: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    # TODO: Implement fund reports
    return {"message": "Fund reports coming soon"}

@router.get("/reports/summary")
async def get_summary_report(
    period: str = Query("monthly"),
    db: AsyncSession = Depends(get_db)
):
    # TODO: Implement summary report
    return {"message": "Summary report coming soon"}


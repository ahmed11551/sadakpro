from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from database import get_db
from models import Campaign
from schemas import CampaignCreate, CampaignResponse

router = APIRouter()

@router.get("/campaigns", response_model=List[CampaignResponse])
async def list_campaigns(
    country: str = Query(None),
    category: str = Query(None),
    status: str = Query("active"),
    db: AsyncSession = Depends(get_db)
):
    query = select(Campaign).where(Campaign.status == status)
    
    if country:
        query = query.where(Campaign.country_code == country.upper())
    if category:
        query = query.where(Campaign.category == category)
    
    result = await db.execute(query)
    campaigns = result.scalars().all()
    return campaigns

@router.get("/campaigns/{campaign_id}", response_model=CampaignResponse)
async def get_campaign(
    campaign_id: int,
    db: AsyncSession = Depends(get_db)
):
    query = select(Campaign).where(Campaign.id == campaign_id)
    result = await db.execute(query)
    campaign = result.scalar_one_or_none()
    
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    return campaign

@router.post("/campaigns", response_model=CampaignResponse)
async def create_campaign(
    campaign_data: CampaignCreate,
    db: AsyncSession = Depends(get_db)
):
    campaign = Campaign(
        owner_id=1,  # TODO: Get from Telegram WebApp initData
        title=campaign_data.title,
        description=campaign_data.description,
        category=campaign_data.category,
        goal_amount=campaign_data.goal_amount,
        end_date=campaign_data.end_date,
        fund_id=campaign_data.fund_id
    )
    
    db.add(campaign)
    await db.commit()
    await db.refresh(campaign)
    
    return campaign

@router.post("/campaigns/{campaign_id}/donate")
async def donate_to_campaign(
    campaign_id: int,
    amount: float,
    db: AsyncSession = Depends(get_db)
):
    query = select(Campaign).where(Campaign.id == campaign_id)
    result = await db.execute(query)
    campaign = result.scalar_one_or_none()
    
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    campaign.collected_amount = float(campaign.collected_amount or 0) + amount
    
    # TODO: Create donation record
    
    await db.commit()
    return {"status": "success", "collected": campaign.collected_amount}

@router.patch("/campaigns/{campaign_id}/status")
async def update_campaign_status(
    campaign_id: int,
    status: str,
    db: AsyncSession = Depends(get_db)
):
    query = select(Campaign).where(Campaign.id == campaign_id)
    result = await db.execute(query)
    campaign = result.scalar_one_or_none()
    
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    campaign.status = status
    await db.commit()
    return campaign

@router.get("/campaigns/{campaign_id}/report")
async def get_campaign_report(
    campaign_id: int,
    db: AsyncSession = Depends(get_db)
):
    query = select(Campaign).where(Campaign.id == campaign_id)
    result = await db.execute(query)
    campaign = result.scalar_one_or_none()
    
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    return {
        "title": campaign.title,
        "goal": float(campaign.goal_amount),
        "collected": float(campaign.collected_amount),
        "progress": (float(campaign.collected_amount) / float(campaign.goal_amount)) * 100,
        "status": campaign.status
    }


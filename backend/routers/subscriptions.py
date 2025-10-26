from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models import Subscription
from schemas import SubscriptionCreate

router = APIRouter()

@router.post("/subscriptions/init")
async def init_subscription(
    subscription_data: SubscriptionCreate,
    db: AsyncSession = Depends(get_db)
):
    subscription = Subscription(
        user_id=1,  # TODO: Get from Telegram WebApp initData
        plan=subscription_data.plan,
        period=subscription_data.period,
        status="active"
    )
    
    db.add(subscription)
    await db.commit()
    await db.refresh(subscription)
    
    return subscription

@router.patch("/subscriptions/{subscription_id}")
async def update_subscription(
    subscription_id: int,
    action: str,  # pause, resume, cancel
    db: AsyncSession = Depends(get_db)
):
    query = select(Subscription).where(Subscription.id == subscription_id)
    result = await db.execute(query)
    subscription = result.scalar_one_or_none()
    
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    
    if action == "pause":
        subscription.status = "paused"
    elif action == "resume":
        subscription.status = "active"
    elif action == "cancel":
        subscription.status = "cancelled"
    
    await db.commit()
    return subscription

@router.get("/me/subscriptions")
async def get_my_subscriptions(
    db: AsyncSession = Depends(get_db)
):
    # TODO: Get user_id from Telegram WebApp initData
    query = select(Subscription).where(Subscription.user_id == 1)
    result = await db.execute(query)
    subscriptions = result.scalars().all()
    return subscriptions


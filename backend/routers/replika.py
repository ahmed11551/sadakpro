"""
Роуты для интеграции с bot.e-replika.ru
"""
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from services.replika_api import replika_api

router = APIRouter()

@router.get("/stats")
async def get_stats() -> Dict:
    """Получить статистику из replika API"""
    stats = await replika_api.get_stats()
    return stats

@router.get("/donations")
async def get_donations(limit: int = 10) -> List[Dict]:
    """Получить пожертвования"""
    donations = await replika_api.get_donations(limit)
    return donations

@router.get("/funds")
async def get_funds() -> List[Dict]:
    """Получить фонды"""
    funds = await replika_api.get_funds()
    return funds

@router.post("/donations/create")
async def create_donation(data: Dict) -> Dict:
    """Создать пожертвование через replika API"""
    result = await replika_api.create_donation(data)
    return result


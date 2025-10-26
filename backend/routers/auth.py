"""
Роуты для аутентификации через Telegram WebApp.
"""
from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from telegram_auth import verify_init_data, get_user_from_init_data

router = APIRouter()

async def get_current_user(
    x_init_data: Optional[str] = Header(None)
):
    """
    Dependency для получения текущего пользователя из Telegram WebApp.
    """
    if not x_init_data:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    user_data = get_user_from_init_data(x_init_data)
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    return user_data

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Получить информацию о текущем пользователе."""
    return current_user


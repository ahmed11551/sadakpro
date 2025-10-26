"""
Модуль для аутентификации через Telegram WebApp.
"""
import hashlib
import hmac
from typing import Dict, Optional
from config import settings

def verify_init_data(init_data: str) -> Optional[Dict]:
    """
    Проверяет подпись initData от Telegram WebApp.
    
    Args:
        init_data: initData параметр от Telegram
        
    Returns:
        Распарсенные данные пользователя или None если подпись неверна
    """
    try:
        # Разделяем init_data на пары ключ=значение
        parts = init_data.split('&')
        data_dict = {}
        
        for part in parts:
            if '=' in part:
                key, value = part.split('=', 1)
                data_dict[key] = value
        
        # Извлекаем hash
        received_hash = data_dict.pop('hash', None)
        if not received_hash:
            return None
        
        # Сортируем параметры
        data_check_string = '&'.join([f"{k}={v}" for k, v in sorted(data_dict.items())])
        
        # Вычисляем секретный ключ
        secret_key = hmac.new(
            "WebAppData".encode(),
            settings.TELEGRAM_SECRET_KEY.encode(),
            hashlib.sha256
        ).digest()
        
        # Вычисляем hash
        calculated_hash = hmac.new(
            secret_key,
            data_check_string.encode(),
            hashlib.sha256
        ).hexdigest()
        
        # Сравниваем
        if not hmac.compare_digest(calculated_hash, received_hash):
            return None
        
        # Возвращаем распарсенные данные
        return data_dict
        
    except Exception as e:
        print(f"Error verifying init_data: {e}")
        return None

def get_user_from_init_data(init_data: str) -> Optional[Dict]:
    """
    Извлекает данные пользователя из initData.
    
    Args:
        init_data: initData параметр от Telegram
        
    Returns:
        Словарь с данными пользователя
    """
    data = verify_init_data(init_data)
    if not data:
        return None
    
    # Парсим user данные
    user = data.get('user')
    if user:
        import json
        user_dict = json.loads(user)
        return user_dict
    
    return None


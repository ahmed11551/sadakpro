"""
Модуль для работы с платежными провайдерами.
"""
import hashlib
import hmac
from typing import Dict, Optional
from config import settings
import httpx

async def get_payment_provider(card_bin: str) -> str:
    """
    Определяет платежного провайдера на основе BIN карты.
    
    Args:
        card_bin: Первые 6 цифр карты
        
    Returns:
        'yookassa' для РФ карт, 'cloudpayments' для международных
    """
    # Простая проверка: если карта начинается с российских префиксов
    russian_bins = ['4276', '4477', '4633', '5038']
    
    if any(card_bin.startswith(bin_prefix) for bin_prefix in russian_bins):
        return 'yookassa'
    
    return 'cloudpayments'

async def create_yookassa_payment(amount: float, currency: str, description: str, return_url: str) -> Dict:
    """
    Создает платеж через YooKassa.
    
    Args:
        amount: Сумма платежа
        currency: Валюта (RUB)
        description: Описание
        return_url: URL для возврата после оплаты
        
    Returns:
        Словарь с данными платежа
    """
    url = "https://api.yookassa.ru/v3/payments"
    
    data = {
        "amount": {
            "value": str(amount),
            "currency": currency
        },
        "confirmation": {
            "type": "redirect",
            "return_url": return_url
        },
        "description": description,
        "capture": True
    }
    
    # TODO: Добавить authentication headers
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=data)
        return response.json()

async def create_cloudpayments_payment(amount: float, currency: str, description: str, invoice_id: str) -> Dict:
    """
    Создает платеж через CloudPayments.
    
    Args:
        amount: Сумма платежа
        currency: Валюта
        description: Описание
        invoice_id: ID инвойса
        
    Returns:
        Словарь с данными платежа
    """
    # TODO: Реализовать CloudPayments API
    return {
        "InvoiceId": invoice_id,
        "Amount": amount,
        "Currency": currency,
        "Description": description
    }

async def verify_yookassa_webhook(payment_data: Dict) -> bool:
    """
    Проверяет подпись webhook от YooKassa.
    
    Args:
        payment_data: Данные от YooKassa
        
    Returns:
        True если подпись валидна
    """
    # TODO: Реализовать проверку подписи
    return True

async def verify_cloudpayments_webhook(payment_data: Dict) -> bool:
    """
    Проверяет HMAC подпись webhook от CloudPayments.
    
    Args:
        payment_data: Данные от CloudPayments
        
    Returns:
        True если подпись валидна
    """
    if 'Content-HMAC' not in payment_data.get('headers', {}):
        return False
    
    content = payment_data.get('Content')
    hmac_received = payment_data['headers']['Content-HMAC']
    
    # Вычисляем HMAC
    hmac_calculated = hmac.new(
        settings.CLOUDPAYMENTS_API_SECRET.encode(),
        content.encode() if isinstance(content, str) else content,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(hmac_calculated, hmac_received)


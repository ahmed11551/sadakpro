"""
Интеграция с API bot.e-replika.ru
"""
import httpx
from typing import Dict, List, Optional
from config import settings

BASE_URL = "https://bot.e-replika.ru"

class ReplikaAPI:
    def __init__(self, api_key: str = "test_token_123"):
        self.api_key = api_key
        self.base_url = BASE_URL
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def get_stats(self) -> Dict:
        """Получить статистику"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/api/stats",
                    headers=self.headers,
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    return self._default_stats()
            except Exception as e:
                print(f"Error getting stats: {e}")
                return self._default_stats()
    
    async def get_donations(self, limit: int = 10) -> List[Dict]:
        """Получить список пожертвований"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/api/donations",
                    headers=self.headers,
                    params={"limit": limit},
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    return self._mock_donations()
            except Exception as e:
                print(f"Error getting donations: {e}")
                return self._mock_donations()
    
    async def get_funds(self) -> List[Dict]:
        """Получить список фондов"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.base_url}/api/funds",
                    headers=self.headers,
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    return self._mock_funds()
            except Exception as e:
                print(f"Error getting funds: {e}")
                return self._mock_funds()
    
    async def create_donation(self, data: Dict) -> Dict:
        """Создать пожертвование"""
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/api/donations",
                    headers=self.headers,
                    json=data,
                    timeout=10.0
                )
                if response.status_code == 200:
                    return response.json()
                else:
                    return {"status": "error", "message": "Failed to create donation"}
            except Exception as e:
                print(f"Error creating donation: {e}")
                return {"status": "error", "message": str(e)}
    
    def _default_stats(self) -> Dict:
        """Данные по умолчанию при недоступности API"""
        return {
            "total_donations": 1850,
            "total_amount": 5240000,
            "total_donors": 1240,
            "active_campaigns": 12,
            "verified_funds": 8,
            "today_donations": 45,
            "today_amount": 187500,
            "this_month_donations": 320,
            "this_month_amount": 1450000
        }
    
    def _mock_donations(self) -> List[Dict]:
        """Моковые данные пожертвований"""
        return [
            {
                "id": 1,
                "amount": 5000,
                "fund_name": "Фонд помощи сиротам",
                "date": "2024-10-26T14:32:00",
                "status": "completed"
            },
            {
                "id": 2,
                "amount": 870,
                "fund_name": "Подписка Pro",
                "date": "2024-10-24T09:15:00",
                "status": "active"
            }
        ]
    
    def _mock_funds(self) -> List[Dict]:
        """Моковые данные фондов"""
        return [
            {
                "id": 1,
                "name": "Фонд помощи сиротам",
                "category": "Образование",
                "verified": True,
                "total_raised": 2450000,
                "total_donors": 420
            },
            {
                "id": 2,
                "name": "Международный фонд милосердия",
                "category": "Международные проекты",
                "verified": True,
                "total_raised": 1890000,
                "total_donors": 890
            }
        ]

# Singleton instance
replika_api = ReplikaAPI()


"""
Professional integration with bot.e-replika.ru API
"""
import httpx
from typing import Dict, List, Optional, Any
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field
from config import settings
import logging

logger = logging.getLogger(__name__)


class DonationStatus(str, Enum):
    """Status enumeration for donations"""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"


class Donation(BaseModel):
    """Donation data model"""
    id: int
    amount: float = Field(gt=0)
    fund_name: str
    fund_id: Optional[int] = None
    date: datetime
    status: DonationStatus
    user_id: Optional[int] = None
    currency: str = "RUB"


class Fund(BaseModel):
    """Fund data model"""
    id: int
    name: str
    category: str
    verified: bool
    total_raised: float = Field(default=0)
    total_donors: int = Field(default=0)
    description: Optional[str] = None
    country_code: Optional[str] = None


class StatsResponse(BaseModel):
    """Statistics response model"""
    total_donations: int
    total_amount: float
    total_donors: int
    active_campaigns: int
    verified_funds: int
    today_donations: int
    today_amount: float
    this_month_donations: int
    this_month_amount: float


class APIError(Exception):
    """Custom API error"""
    def __init__(self, message: str, status_code: Optional[int] = None):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class ReplikaAPIClient:
    """
    Professional API client for bot.e-replika.ru
    with proper error handling, retries, and caching
    """
    
    def __init__(
        self,
        api_key: str = "test_token_123",
        base_url: str = "https://bot.e-replika.ru",
        timeout: float = 10.0,
        max_retries: int = 3
    ):
        self.api_key = api_key
        self.base_url = base_url
        self.timeout = timeout
        self.max_retries = max_retries
        self._client: Optional[httpx.AsyncClient] = None
    
    async def __aenter__(self):
        """Async context manager entry"""
        self._client = httpx.AsyncClient(
            base_url=self.base_url,
            timeout=self.timeout,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "User-Agent": "Sadaka-Pass/1.0"
            }
        )
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self._client:
            await self._client.aclose()
    
    @property
    def client(self) -> httpx.AsyncClient:
        """Get or create HTTP client"""
        if self._client is None:
            raise RuntimeError("Client not initialized. Use context manager.")
        return self._client
    
    async def _request(
        self,
        method: str,
        endpoint: str,
        **kwargs
    ) -> Any:
        """
        Make HTTP request with retry logic
        """
        last_error = None
        
        for attempt in range(self.max_retries):
            try:
                response = await self.client.request(
                    method=method,
                    url=endpoint,
                    **kwargs
                )
                
                # Handle successful response
                if response.status_code in (200, 201):
                    return response.json()
                
                # Handle error responses
                elif response.status_code == 401:
                    raise APIError("Unauthorized. Check API key.", 401)
                elif response.status_code == 403:
                    raise APIError("Forbidden. Check permissions.", 403)
                elif response.status_code == 404:
                    raise APIError(f"Resource not found: {endpoint}", 404)
                elif response.status_code >= 500:
                    logger.warning(
                        f"Server error {response.status_code}, attempt {attempt + 1}/{self.max_retries}"
                    )
                    last_error = APIError(
                        f"Server error: {response.status_code}",
                        response.status_code
                    )
                    if attempt < self.max_retries - 1:
                        continue
                else:
                    raise APIError(
                        f"Unexpected status code: {response.status_code}",
                        response.status_code
                    )
                    
            except httpx.RequestError as e:
                logger.error(f"Request error: {e}")
                last_error = APIError(f"Network error: {str(e)}")
                if attempt < self.max_retries - 1:
                    continue
            
            except APIError:
                raise
            
            except Exception as e:
                logger.error(f"Unexpected error: {e}")
                last_error = APIError(f"Unexpected error: {str(e)}")
                if attempt < self.max_retries - 1:
                    continue
        
        # All retries failed
        if last_error:
            raise last_error
        
        raise APIError("Request failed after retries")
    
    async def get_stats(self) -> StatsResponse:
        """Get statistics from API"""
        try:
            data = await self._request("GET", "/api/stats")
            return StatsResponse(**data)
        except APIError as e:
            logger.error(f"Failed to get stats: {e.message}")
            # Return default stats as fallback
            return StatsResponse(
                total_donations=0,
                total_amount=0.0,
                total_donors=0,
                active_campaigns=0,
                verified_funds=0,
                today_donations=0,
                today_amount=0.0,
                this_month_donations=0,
                this_month_amount=0.0
            )
    
    async def get_donations(
        self,
        limit: int = 10,
        offset: int = 0,
        status: Optional[DonationStatus] = None
    ) -> List[Donation]:
        """Get list of donations with pagination and filtering"""
        try:
            params = {"limit": limit, "offset": offset}
            if status:
                params["status"] = status.value
            
            data = await self._request("GET", "/api/donations", params=params)
            
            donations = []
            for item in data.get("results", data):
                try:
                    # Parse datetime string
                    if isinstance(item.get("date"), str):
                        item["date"] = datetime.fromisoformat(item["date"].replace("Z", "+00:00"))
                    donations.append(Donation(**item))
                except Exception as e:
                    logger.warning(f"Failed to parse donation: {e}")
                    continue
            
            return donations
            
        except APIError as e:
            logger.error(f"Failed to get donations: {e.message}")
            return []
    
    async def get_funds(
        self,
        verified_only: bool = True
    ) -> List[Fund]:
        """Get list of funds"""
        try:
            params = {}
            if verified_only:
                params["verified"] = "true"
            
            data = await self._request("GET", "/api/funds", params=params)
            
            funds = []
            for item in data.get("results", data):
                try:
                    funds.append(Fund(**item))
                except Exception as e:
                    logger.warning(f"Failed to parse fund: {e}")
                    continue
            
            return funds
            
        except APIError as e:
            logger.error(f"Failed to get funds: {e.message}")
            return []
    
    async def create_donation(
        self,
        amount: float,
        fund_id: Optional[int] = None,
        fund_name: Optional[str] = None,
        currency: str = "RUB"
    ) -> Donation:
        """
        Create a new donation
        """
        if amount <= 0:
            raise ValueError("Amount must be greater than 0")
        
        payload = {
            "amount": amount,
            "currency": currency,
            "fund_id": fund_id,
            "fund_name": fund_name
        }
        
        try:
            data = await self._request("POST", "/api/donations", json=payload)
            
            # Parse datetime if provided
            if isinstance(data.get("date"), str):
                data["date"] = datetime.fromisoformat(data["date"].replace("Z", "+00:00"))
            
            return Donation(**data)
            
        except APIError as e:
            logger.error(f"Failed to create donation: {e.message}")
            raise


# Global client instance
replika_client = ReplikaAPIClient()

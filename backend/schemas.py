from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class FundResponse(BaseModel):
    id: int
    name: str
    country_code: Optional[str]
    categories: List[str]
    verified: bool
    logo_url: Optional[str]
    short_desc: Optional[str]
    website: Optional[str]
    
    class Config:
        from_attributes = True

class DonationCreate(BaseModel):
    fund_id: Optional[int] = None
    campaign_id: Optional[int] = None
    amount_value: float
    currency: str = "RUB"
    provider: Optional[str] = None

class DonationResponse(BaseModel):
    id: int
    user_id: int
    fund_id: Optional[int]
    campaign_id: Optional[int]
    amount_value: float
    currency: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class SubscriptionCreate(BaseModel):
    plan: str  # basic, pro, premium
    period: str  # P1M, P3M, P6M, P12M

class CampaignCreate(BaseModel):
    title: str
    description: str
    category: str
    goal_amount: float
    end_date: datetime
    fund_id: Optional[int] = None

class CampaignResponse(BaseModel):
    id: int
    owner_id: int
    title: str
    description: str
    category: str
    goal_amount: float
    collected_amount: float
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ZakatCalcRequest(BaseModel):
    money_amount: float
    gold_grams: float = 0
    silver_grams: float = 0
    business_value: float = 0
    debts: float = 0

class ZakatCalcResponse(BaseModel):
    total_wealth: float
    nisab: float
    zakat_due: float
    above_nisab: bool


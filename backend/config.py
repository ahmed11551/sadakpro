from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/sadaqa_db"
    
    # Telegram
    TELEGRAM_BOT_TOKEN: str = ""
    TELEGRAM_SECRET_KEY: str = ""
    
    # Payments
    YOOKASSA_SHOP_ID: str = ""
    YOOKASSA_SECRET_KEY: str = ""
    CLOUDPAYMENTS_API_SECRET: str = ""
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "https://your-frontend.vercel.app"]
    
    class Config:
        env_file = ".env"

settings = Settings()


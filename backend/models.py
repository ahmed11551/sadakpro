from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Numeric, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    tg_id = Column(Integer, unique=True, nullable=False)
    locale = Column(String(10), default='ru')
    created_at = Column(DateTime, default=datetime.utcnow)
    
    donations = relationship("Donation", back_populates="user")
    subscriptions = relationship("Subscription", back_populates="user")
    campaigns = relationship("Campaign", back_populates="owner")

class Fund(Base):
    __tablename__ = "funds"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    country_code = Column(String(3))
    categories = Column(ARRAY(Text))
    verified = Column(Boolean, default=False)
    logo_url = Column(Text)
    short_desc = Column(Text)
    website = Column(Text)
    social_links = Column(ARRAY(Text))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    donations = relationship("Donation", back_populates="fund")

class Donation(Base):
    __tablename__ = "donations"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    fund_id = Column(Integer, ForeignKey("funds.id"), nullable=True)
    campaign_id = Column(Integer, nullable=True)
    amount_value = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), default='RUB')
    provider = Column(String(20))
    status = Column(String(20), default='pending')
    created_at = Column(DateTime, default=datetime.utcnow)
    paid_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="donations")
    fund = relationship("Fund", back_populates="donations")

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan = Column(String(20))  # basic, pro, premium
    period = Column(String(10))  # P1M, P3M, P6M, P12M
    status = Column(String(20), default='active')
    provider = Column(String(20))
    next_charge_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="subscriptions")

class Campaign(Base):
    __tablename__ = "campaigns"
    
    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    fund_id = Column(Integer, ForeignKey("funds.id"), nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    category = Column(String(50))
    goal_amount = Column(Numeric(10, 2), nullable=False)
    collected_amount = Column(Numeric(10, 2), default=0)
    country_code = Column(String(3))
    status = Column(String(20), default='pending')  # pending, active, completed, closed
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="campaigns")

class ZakatCalc(Base):
    __tablename__ = "zakat_calculations"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    payload_json = Column(Text)  # JSON with calculation data
    zakat_due = Column(Numeric(10, 2))
    above_nisab = Column(Boolean)
    created_at = Column(DateTime, default=datetime.utcnow)

class PartnerApplication(Base):
    __tablename__ = "partner_applications"
    
    id = Column(Integer, primary_key=True)
    org_name = Column(String(255), nullable=False)
    country_code = Column(String(3))
    categories = Column(ARRAY(Text))
    website = Column(Text)
    contact_name = Column(String(255))
    email = Column(String(255))
    about = Column(Text)
    status = Column(String(20), default='pending')
    created_at = Column(DateTime, default=datetime.utcnow)

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True)
    fund_id = Column(Integer, ForeignKey("funds.id"))
    period_start = Column(DateTime)
    period_end = Column(DateTime)
    file_url = Column(Text)
    verified = Column(Boolean, default=False)
    total_collected = Column(Numeric(10, 2))
    total_distributed = Column(Numeric(10, 2))
    created_at = Column(DateTime, default=datetime.utcnow)


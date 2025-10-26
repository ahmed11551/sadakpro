from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from models import ZakatCalc
from schemas import ZakatCalcRequest, ZakatCalcResponse

router = APIRouter()

@router.post("/zakat/calc", response_model=ZakatCalcResponse)
async def calculate_zakat(
    calc_data: ZakatCalcRequest,
    db: AsyncSession = Depends(get_db)
):
    # Nisab values (current gold price in RUB, assume ~6000 RUB per gram)
    # Nisab = 87.48 grams of gold ≈ 524,880 RUB
    NISAB_RUB = 524880.0
    
    # Calculate total wealth
    total_wealth = (
        calc_data.money_amount +
        (calc_data.gold_grams * 6000) +
        (calc_data.silver_grams * 80) +
        calc_data.business_value -
        calc_data.debts
    )
    
    above_nisab = total_wealth >= NISAB_RUB
    zakat_due = 0
    
    if above_nisab:
        zakat_due = total_wealth * 0.025  # 2.5%
    
    # Save calculation
    calc = ZakatCalc(
        user_id=1,  # TODO: Get from Telegram WebApp initData
        payload_json=str(calc_data.dict()),
        zakat_due=zakat_due,
        above_nisab=above_nisab
    )
    
    db.add(calc)
    await db.commit()
    
    return ZakatCalcResponse(
        total_wealth=total_wealth,
        nisab=NISAB_RUB,
        zakat_due=zakat_due,
        above_nisab=above_nisab
    )

@router.post("/zakat/pay")
async def pay_zakat(
    amount: float,
    db: AsyncSession = Depends(get_db)
):
    # TODO: Process zakat payment
    return {"status": "pending", "amount": amount}

@router.get("/zakat/history")
async def get_zakat_history(
    db: AsyncSession = Depends(get_db)
):
    # TODO: Get user_id from Telegram WebApp initData
    from sqlalchemy import select
    query = select(ZakatCalc).where(ZakatCalc.user_id == 1)
    result = await db.execute(query)
    calculations = result.scalars().all()
    return calculations


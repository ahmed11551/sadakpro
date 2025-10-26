import { useState } from 'react'
import '../App.css'

interface Plan {
  id: string
  name: string
  price_monthly: number
  period: string
  bonus_months: number
  charity_percent: number
}

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  const plans: Plan[] = [
    { id: 'basic', name: 'Базовый', price_monthly: 290, period: 'P1M', bonus_months: 0, charity_percent: 0 },
    { id: 'pro', name: 'Pro', price_monthly: 290, period: 'P3M', bonus_months: 0, charity_percent: 5 },
    { id: 'premium', name: 'Premium', price_monthly: 290, period: 'P12M', bonus_months: 4, charity_percent: 10 }
  ]

  return (
    <div className="container">
      <h1>📅 Садака-подписка</h1>
      
      <div className="card">
        <p>Садака-подписка — ваша регулярная милостыня. Сделайте садака-джария на развитие цифровой уммы и получите доступ к знаниям и благодарность.</p>
      </div>

      {plans.map(plan => (
        <div key={plan.id} className="card">
          <h2>{plan.name}</h2>
          <p>{plan.price_monthly} ₽ / месяц</p>
          {plan.bonus_months > 0 && (
            <span className="badge">🎁 +{plan.bonus_months} мес. в подарок</span>
          )}
          {plan.charity_percent > 0 && (
            <p style={{ fontSize: '14px', marginTop: 8 }}>
              {plan.charity_percent}% идёт в благотворительность
            </p>
          )}
          
          <button 
            className={`button ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            Выбрать
          </button>
        </div>
      ))}

      {selectedPlan && (
        <button className="button">
          Оформить подписку
        </button>
      )}
    </div>
  )
}

export default Subscription


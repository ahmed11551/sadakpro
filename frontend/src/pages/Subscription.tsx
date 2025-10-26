import { useState } from 'react'
import '../App.css'

interface Plan {
  id: string
  name: string
  price_monthly: number
  price_total: number
  period: string
  bonus_months: number
  charity_percent: number
  popular?: boolean
}

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  const plans: Plan[] = [
    { 
      id: 'basic', 
      name: 'Базовый', 
      price_monthly: 290, 
      price_total: 290,
      period: '1 месяц', 
      bonus_months: 0, 
      charity_percent: 0 
    },
    { 
      id: 'pro', 
      name: 'Pro', 
      price_monthly: 290, 
      price_total: 870,
      period: '3 месяца', 
      bonus_months: 0, 
      charity_percent: 5,
      popular: true
    },
    { 
      id: 'premium', 
      name: 'Premium', 
      price_monthly: 290, 
      price_total: 2320,
      period: '12 месяцев', 
      bonus_months: 4, 
      charity_percent: 10
    }
  ]

  const handleSubscribe = () => {
    if (selectedPlan) {
      alert(`Оформление подписки: ${plans.find(p => p.id === selectedPlan)?.name}`)
    }
  }

  return (
    <div className="fade-in">
      <h1>📅 Садака-подписка</h1>
      
      <div className="card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>Что это?</h2>
          <span className="badge badge-info">Садака-джария</span>
        </div>
        <p style={{ color: '#666', marginTop: '12px' }}>
          Садака-подписка — ваша регулярная милостыня. Сделайте садака-джария на развитие 
          цифровой уммы и получите доступ к знаниям и благодарность.
        </p>
        
        <div style={{ marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '12px' }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
            ✨ 5% от Pro и 10% от Premium идёт в благотворительность
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">1,420</div>
          <div className="stat-label">Активных подписок</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">85К ₽</div>
          <div className="stat-label">В благотворительность</div>
        </div>
      </div>

      {plans.map(plan => (
        <div key={plan.id} className="card" style={{ border: selectedPlan === plan.id ? '3px solid #667eea' : 'none' }}>
          {plan.popular && (
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span className="badge" style={{ fontSize: '11px' }}>🔥 ПОПУЛЯРНЫЙ</span>
            </div>
          }
          <div className="card-header">
            <h2 style={{ margin: 0 }}>{plan.name}</h2>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                {plan.price_total.toLocaleString()} ₽
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                за {plan.period}
              </div>
            </div>
          </div>
          
          {plan.bonus_months > 0 && (
            <div style={{ marginTop: '12px', padding: '12px', background: '#f0f4ff', borderRadius: '12px', textAlign: 'center' }}>
              <span className="badge">🎁 +{plan.bonus_months} мес. в подарок</span>
            </div>
          )}
          
          {plan.charity_percent > 0 && (
            <div style={{ marginTop: '12px', padding: '12px', background: '#e8f5e9', borderRadius: '12px', textAlign: 'center' }}>
              <span style={{ color: '#4caf50', fontWeight: '600' }}>
                💚 {plan.charity_percent}% идёт в благотворительность
              </span>
            </div>
          )}
          
          <button 
            className="button"
            style={{ marginTop: '16px', width: '100%' }}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {selectedPlan === plan.id ? '✓ Выбрано' : 'Выбрать план'}
          </button>
        </div>
      ))}

      {selectedPlan && (
        <button className="button" onClick={handleSubscribe} style={{ marginTop: '8px' }}>
          🚀 Оформить подписку
        </button>
      )}
    </div>
  )
}

export default Subscription

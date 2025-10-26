import { useState } from 'react'
import { useStats } from '../hooks/useStats'
import '../App.css'

function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [fundId, setFundId] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const { stats, loading } = useStats()

  const amounts = [100, 250, 500, 1000, 2500, 5000]

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}М`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}К`
    return num.toString()
  }

  const handleDonate = async () => {
    const amount = selectedAmount || parseFloat(customAmount)
    if (amount > 0) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/replika/donations/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer test_token_123'
          },
          body: JSON.stringify({
            amount,
            fund_id: fundId,
            category,
            timestamp: new Date().toISOString()
          })
        })
        alert(`Спасибо! Вы пожертвовали ${amount} ₽`)
      } catch (error) {
        alert(`Ошибка: ${error}`)
      }
    }
  }

  return (
    <div className="fade-in">
      <h1>💰 Пожертвовать</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{loading ? '...' : formatNumber(stats?.total_donations || 0)}</div>
          <div className="stat-label">Всего пожертвований</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{loading ? '...' : formatNumber(stats?.today_amount || 0)} ₽</div>
          <div className="stat-label">Собрано сегодня</div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2>Выберите фонд</h2>
          <span className="badge">Топ фонд</span>
        </div>
        <select className="input" value={fundId} onChange={(e) => setFundId(e.target.value)}>
          <option value="">Все фонды</option>
          <option value="1">🎁 Фонд помощи сиротам</option>
          <option value="2">🕌 Строительство мечетей</option>
          <option value="3">📚 Образование для детей</option>
          <option value="4">🏥 Медицинская помощь</option>
          <option value="5">🌍 Международные проекты</option>
        </select>
      </div>

      <div className="card">
        <h2>Выберите категорию</h2>
        <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Все категории</option>
          <option value="education">📚 Образование</option>
          <option value="health">🏥 Здоровье</option>
          <option value="mosques">🕌 Мечети</option>
          <option value="orphans">🎁 Сироты</option>
          <option value="international">🌍 Международные</option>
        </select>
      </div>

      <div className="card">
        <h2>Сумма пожертвования</h2>
        <div className="input-group">
          {amounts.map(amount => (
            <button
              key={amount}
              type="button"
              className={selectedAmount === amount ? 'selected' : ''}
              onClick={() => setSelectedAmount(amount)}
            >
              {amount} ₽
            </button>
          ))}
        </div>
        
        <input
          type="number"
          className="input"
          placeholder="Или введите свою сумму (минимум 100 ₽)"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value)
            setSelectedAmount(0)
          }}
        />
        
        {(selectedAmount > 0 || parseFloat(customAmount) >= 100) && (
          <button className="button" onClick={handleDonate}>
            💳 Пожертвовать {selectedAmount || customAmount} ₽
          </button>
        )}
      </div>

      <div className="card">
        <h2>Популярные фонды</h2>
        <div style={{ marginTop: '16px' }}>
          <div style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🎁 Фонд помощи сиротам</span>
            <button className="button" style={{ width: 'auto', padding: '8px 16px', fontSize: '14px', margin: 0 }}>Выбрать</button>
          </div>
          <div style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🕌 Строительство мечетей</span>
            <button className="button" style={{ width: 'auto', padding: '8px 16px', fontSize: '14px', margin: 0 }}>Выбрать</button>
          </div>
          <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>📚 Образование</span>
            <button className="button" style={{ width: 'auto', padding: '8px 16px', fontSize: '14px', margin: 0 }}>Выбрать</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate

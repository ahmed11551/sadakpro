import { useState } from 'react'
import '../App.css'

interface Fund {
  id: number
  name: string
  description: string
  country: string
  verified: boolean
  category: string
  raised: number
  donors: number
}

function Funds() {
  const [funds] = useState<Fund[]>([
    {
      id: 1,
      name: 'Фонд помощи сиротам',
      description: 'Поддержка детей-сирот в получении образования и развитии',
      country: 'Россия',
      verified: true,
      category: 'Образование',
      raised: 2450000,
      donors: 420
    },
    {
      id: 2,
      name: 'Международный фонд милосердия',
      description: 'Гуманитарные проекты по всему миру',
      country: 'Международный',
      verified: true,
      category: 'Международные проекты',
      raised: 1890000,
      donors: 890
    },
    {
      id: 3,
      name: 'Построй мечеть',
      description: 'Строительство мечетей в нуждающихся регионах',
      country: 'Россия, Казахстан',
      verified: true,
      category: 'Мечети',
      raised: 5600000,
      donors: 1200
    },
    {
      id: 4,
      name: 'Фонд медицинской помощи',
      description: 'Оказание медицинской помощи нуждающимся',
      country: 'Россия',
      verified: true,
      category: 'Здоровье',
      raised: 980000,
      donors: 340
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = ['Все категории', 'Образование', 'Здоровье', 'Мечети', 'Международные']

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU')
  }

  return (
    <div className="fade-in">
      <h1>🏛️ Фонды-партнёры</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">24</div>
          <div className="stat-label">Партнёров</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">10.9М ₽</div>
          <div className="stat-label">Собрано</div>
        </div>
      </div>

      <div className="card">
        <h2>Фильтры</h2>
        <div className="input-group">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={selectedCategory === cat ? 'selected' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {funds.map(fund => (
        <div key={fund.id} className="card">
          <div className="card-header">
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>{fund.name}</h2>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                📍 {fund.country}
              </p>
            </div>
            {fund.verified && (
              <span className="badge badge-success">✓ Проверен</span>
            )}
          </div>
          
          <p style={{ color: '#666', marginBottom: '16px' }}>{fund.description}</p>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1, background: '#f5f5f5', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>
                {formatNumber(fund.raised)} ₽
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Собрано</div>
            </div>
            <div style={{ flex: 1, background: '#f5f5f5', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>
                {fund.donors}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>Доноров</div>
            </div>
          </div>
          
          <button className="button">
            💚 Пожертвовать в этот фонд
          </button>
        </div>
      ))}

      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Хотите стать партнёром?</h2>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          Присоединяйтесь к нашей сети партнёров и помогайте миллионам людей
        </p>
        <button className="button">
          📝 Оставить заявку
        </button>
      </div>
    </div>
  )
}

export default Funds

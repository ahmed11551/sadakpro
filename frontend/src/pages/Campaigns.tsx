import { useState } from 'react'
import '../App.css'

interface Campaign {
  id: number
  title: string
  description: string
  goal: number
  collected: number
  status: string
  image?: string
}

function Campaigns() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      title: 'Помощь сиротам в обучении',
      description: 'Сбор средств на школьные принадлежности и одежду для 50 детей-сирот',
      goal: 500000,
      collected: 187500,
      status: 'active',
      image: '🎓'
    },
    {
      id: 2,
      title: 'Строительство мечети',
      description: 'Строительство мечети в отдалённом селе',
      goal: 2000000,
      collected: 1450000,
      status: 'active',
      image: '🕌'
    },
    {
      id: 3,
      title: 'Медицинская помощь',
      description: 'Лечение и операции для 10 нуждающихся семей',
      goal: 300000,
      collected: 95000,
      status: 'active',
      image: '🏥'
    }
  ])

  const getProgress = (collected: number, goal: number) => {
    return Math.min((collected / goal) * 100, 100)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU')
  }

  return (
    <div className="fade-in">
      <h1>🎯 Целевые кампании</h1>

      <button className="button" style={{ marginBottom: '16px' }}>
        ➕ Создать кампанию
      </button>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">24</div>
          <div className="stat-label">Активных кампаний</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">1.7М ₽</div>
          <div className="stat-label">Собрано всего</div>
        </div>
      </div>

      {campaigns.map(campaign => (
        <div key={campaign.id} className="card">
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{campaign.image}</div>
          <div className="card-header">
            <h2 style={{ fontSize: '18px', margin: 0 }}>{campaign.title}</h2>
            <span className="badge badge-success">Активна</span>
          </div>
          <p style={{ color: '#666', marginBottom: '16px' }}>{campaign.description}</p>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgress(campaign.collected, campaign.goal)}%` }}
            />
          </div>
          
          <div className="progress-text">
            {formatNumber(campaign.collected)} ₽ из {formatNumber(campaign.goal)} ₽
          </div>
          
          <button className="button" style={{ marginTop: '16px' }}>
            💚 Присоединиться к кампании
          </button>
        </div>
      ))}
      
      <div className="card">
        <h2>Завершённые кампании</h2>
        <div style={{ padding: '16px', textAlign: 'center', color: '#999' }}>
          <p>🎉 12 кампаний успешно завершены</p>
          <button className="button button-secondary" style={{ marginTop: '12px', width: 'auto' }}>
            Посмотреть все
          </button>
        </div>
      </div>
    </div>
  )
}

export default Campaigns

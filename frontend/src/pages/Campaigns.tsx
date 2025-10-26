import { useState } from 'react'
import '../App.css'

interface Campaign {
  id: number
  title: string
  description: string
  goal: number
  collected: number
  status: string
}

function Campaigns() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: 1,
      title: 'Помощь сиротам',
      description: 'Сбор средств на одежду и питание',
      goal: 100000,
      collected: 45000,
      status: 'active'
    }
  ])

  const getProgress = (collected: number, goal: number) => {
    return Math.min((collected / goal) * 100, 100)
  }

  return (
    <div className="container">
      <h1>🎯 Целевые кампании</h1>

      <button className="button" style={{ marginBottom: 16 }}>
        + Создать кампанию
      </button>

      {campaigns.map(campaign => (
        <div key={campaign.id} className="card">
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgress(campaign.collected, campaign.goal)}%` }}
            />
          </div>
          
          <div className="progress-text">
            Собрано: {campaign.collected.toLocaleString()} ₽ из {campaign.goal.toLocaleString()} ₽
          </div>
          
          <button className="button">
            Присоединиться
          </button>
        </div>
      ))}
    </div>
  )
}

export default Campaigns


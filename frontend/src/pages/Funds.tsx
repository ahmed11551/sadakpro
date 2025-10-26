import '../App.css'

interface Fund {
  id: number
  name: string
  description: string
  country: string
  verified: boolean
  logo?: string
}

function Funds() {
  const funds: Fund[] = [
    {
      id: 1,
      name: 'Фонд помощи сиротам',
      description: 'Помощь детям-сиротам в образовании и развитии',
      country: 'RU',
      verified: true
    },
    {
      id: 2,
      name: 'Международный фонд милосердия',
      description: 'Международные гуманитарные проекты',
      country: 'KZ',
      verified: true
    }
  ]

  return (
    <div className="container">
      <h1>🏛️ Фонды-партнёры</h1>

      {funds.map(fund => (
        <div key={fund.id} className="card">
          {fund.verified && <span className="badge">✓ Проверен</span>}
          <h2>{fund.name}</h2>
          <p>{fund.description}</p>
          <p style={{ fontSize: '14px', color: '#666' }}>📍 {fund.country}</p>
          <button className="button">
            Пожертвовать
          </button>
        </div>
      ))}

      <div className="card">
        <h2>Хотите стать партнёром?</h2>
        <p>Заполните заявку на партнёрство</p>
        <button className="button">
          Оставить заявку
        </button>
      </div>
    </div>
  )
}

export default Funds


import '../App.css'

interface Transaction {
  id: number
  date: string
  time: string
  type: string
  amount: number
  status: string
  fund?: string
  campaign?: string
}

function History() {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: '2024-10-26',
      time: '14:32',
      type: 'Пожертвование',
      amount: 5000,
      status: 'Успешно',
      fund: '🎁 Фонд помощи сиротам'
    },
    {
      id: 2,
      date: '2024-10-24',
      time: '09:15',
      type: 'Подписка',
      amount: 870,
      status: 'Активна',
      campaign: 'Pro - 3 месяца'
    },
    {
      id: 3,
      date: '2024-10-20',
      time: '16:45',
      type: 'Пожертвование',
      amount: 1000,
      status: 'Успешно',
      fund: '🏛️ Построй мечеть'
    },
    {
      id: 4,
      date: '2024-10-18',
      time: '11:30',
      type: 'Закят',
      amount: 12500,
      status: 'Успешно',
      campaign: 'Расчёт закята'
    },
    {
      id: 5,
      date: '2024-10-15',
      time: '13:20',
      type: 'Кампания',
      amount: 2500,
      status: 'Успешно',
      campaign: '🎯 Помощь сиротам в обучении'
    }
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', { 
      day: '2-digit', 
      month: 'long',
      year: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU')
  }

  const getStatusColor = (status: string) => {
    if (status === 'Успешно' || status === 'Активна') return '#4caf50'
    if (status === 'Ожидание') return '#ff9800'
    return '#f44336'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'Успешно') return '✅'
    if (status === 'Активна') return '🟢'
    if (status === 'Ожидание') return '⏳'
    return '❌'
  }

  return (
    <div className="fade-in">
      <h1>📈 История и отчёты</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{formatNumber(18970)}</div>
          <div className="stat-label">Всего пожертвовано</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{transactions.length}</div>
          <div className="stat-label">Транзакций</div>
        </div>
      </div>

      <div className="card">
        <h2>Фильтры</h2>
        <div className="input-group">
          {['Все', 'Пожертвование', 'Подписка', 'Закят', 'Кампании'].map(type => (
            <button key={type} type="button" className="button button-secondary" style={{ margin: 0 }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {transactions.map(transaction => (
          <div key={transaction.id} className="card" style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                  {transaction.type}
                </div>
                {(transaction.fund || transaction.campaign) && (
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                    {transaction.fund || transaction.campaign}
                  </div>
                )}
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {formatDate(transaction.date)} в {transaction.time}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#667eea', marginBottom: '4px' }}>
                  +{formatNumber(transaction.amount)} ₽
                </div>
                <span style={{ 
                  fontSize: '12px', 
                  color: getStatusColor(transaction.status),
                  fontWeight: '600'
                }}>
                  {getStatusIcon(transaction.status)} {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Отчёты фондов</h2>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          Прозрачная отчётность о том, как используются ваши пожертвования
        </p>
        <button className="button">
          📊 Посмотреть отчёты
        </button>
      </div>

      <div className="card">
        <h2>Экспорт данных</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="button button-secondary" style={{ flex: 1 }}>
            📄 PDF
          </button>
          <button className="button button-secondary" style={{ flex: 1 }}>
            📋 Excel
          </button>
        </div>
      </div>
    </div>
  )
}

export default History

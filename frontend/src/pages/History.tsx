import { useStats } from '../hooks/useStats'
import { useDonations } from '../hooks/useDonations'
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
  const { stats, loading: statsLoading } = useStats()
  const { donations, loading: donationsLoading } = useDonations(10)
  
  // Transform API donations to transactions
  const transactions: Transaction[] = donations.map(donation => ({
    id: donation.id,
    date: donation.date.split('T')[0],
    time: donation.date.split('T')[1]?.split('.')[0] || '',
    type: 'Пожертвование',
    amount: donation.amount,
    status: donation.status === 'completed' ? 'Успешно' : donation.status,
    fund: donation.fund_name
  }))
  
  // Add mock data if API returns less than 5 items
  const mockTransactions: Transaction[] = [
    {
      id: 100,
      date: '2024-10-24',
      time: '09:15',
      type: 'Подписка',
      amount: 870,
      status: 'Активна',
      campaign: 'Pro - 3 месяца'
    },
    {
      id: 101,
      date: '2024-10-18',
      time: '11:30',
      type: 'Закят',
      amount: 12500,
      status: 'Успешно',
      campaign: 'Расчёт закята'
    }
  ]
  
  const allTransactions = [...transactions, ...mockTransactions].slice(0, 10)

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
          <div className="stat-value">{statsLoading ? '...' : formatNumber(stats?.total_amount || 0)}</div>
          <div className="stat-label">Всего пожертвовано</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{statsLoading ? '...' : stats?.total_donations || 0}</div>
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
        {donationsLoading ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading">
              <div className="spinner"></div>
            </div>
          </div>
        ) : allTransactions.map(transaction => (
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

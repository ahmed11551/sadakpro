import '../App.css'

interface Transaction {
  id: number
  date: string
  type: string
  amount: number
  status: string
  fund?: string
}

function History() {
  const transactions: Transaction[] = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'Пожертвование',
      amount: 1000,
      status: 'Успешно',
      fund: 'Фонд помощи сиротам'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'Подписка',
      amount: 290,
      status: 'Активна'
    }
  ]

  return (
    <div className="container">
      <h1>📈 История</h1>

      <div className="card" style={{ marginBottom: 16 }}>
        <label>Тип операции</label>
        <select className="input">
          <option value="">Все типы</option>
          <option value="donation">Пожертвование</option>
          <option value="subscription">Подписка</option>
          <option value="zakat">Закят</option>
        </select>
      </div>

      {transactions.map(transaction => (
        <div key={transaction.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <strong>{transaction.type}</strong>
            <strong>{transaction.amount} ₽</strong>
          </div>
          <p style={{ fontSize: '14px', color: '#666' }}>{transaction.date}</p>
          {transaction.fund && <p>{transaction.fund}</p>}
          <span className="badge">{transaction.status}</span>
        </div>
      ))}

      <div className="card">
        <h2>Отчёты фондов</h2>
        <p>Просмотр отчётов о использовании средств</p>
        <button className="button">
          Просмотреть отчёты
        </button>
      </div>
    </div>
  )
}

export default History


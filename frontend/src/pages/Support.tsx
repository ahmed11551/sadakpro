import { useState } from 'react'
import '../App.css'

function Support() {
  const [amount, setAmount] = useState<number>(500)
  
  const amounts = [500, 1000, 2500, 5000]

  const handleSupport = () => {
    alert(`Спасибо за поддержку! Вы пожертвовали ${amount} ₽`)
  }

  return (
    <div className="fade-in">
      <h1>🤲 Поддержать проект</h1>
      
      <div className="card">
        <div className="card-header">
          <h2>Быстрое пожертвование</h2>
          <span className="badge badge-success">Проверено</span>
        </div>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Поддержите развитие платформы Садака-Пасс. Ваши пожертвования помогают развивать технологии для благих дел.
        </p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">8,420</div>
            <div className="stat-label">Поддержали</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">1.2М ₽</div>
            <div className="stat-label">Собрано</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Выберите сумму</h2>
        <div className="input-group">
          {amounts.map(sum => (
            <button
              key={sum}
              type="button"
              className={amount === sum ? 'selected' : ''}
              onClick={() => setAmount(sum)}
            >
              {sum} ₽
            </button>
          ))}
        </div>
        
        <button className="button" onClick={handleSupport}>
          💚 Поддержать {amount} ₽
        </button>
        
        <button className="button button-secondary" style={{ marginTop: '8px' }}>
          📊 Посмотреть отчёты
        </button>
      </div>
      
      <div className="card">
        <h2>Как используются средства?</h2>
        <div style={{ marginTop: '12px' }}>
          <p style={{ marginBottom: '12px' }}>✅ Разработка новых функций</p>
          <p style={{ marginBottom: '12px' }}>✅ Поддержка серверов</p>
          <p style={{ marginBottom: '12px' }}>✅ Партнёрство с фондами</p>
          <p>✅ Административные расходы</p>
        </div>
      </div>
    </div>
  )
}

export default Support

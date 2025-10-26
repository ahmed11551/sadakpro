import { useState } from 'react'
import '../App.css'

function Zakat() {
  const [money, setMoney] = useState<string>('0')
  const [gold, setGold] = useState<string>('0')
  const [silver, setSilver] = useState<string>('0')
  const [business, setBusiness] = useState<string>('0')
  const [debts, setDebts] = useState<string>('0')
  const [result, setResult] = useState<any>(null)

  const calculateZakat = () => {
    const totalWealth = 
      parseFloat(money) + 
      parseFloat(gold) * 6000 + 
      parseFloat(silver) * 80 + 
      parseFloat(business) - 
      parseFloat(debts)
    
    const NISAB = 524880 // руб
    const aboveNisab = totalWealth >= NISAB
    const zakatDue = aboveNisab ? Math.ceil(totalWealth * 0.025) : 0

    setResult({
      totalWealth,
      aboveNisab,
      zakatDue,
      nisab: NISAB
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU')
  }

  return (
    <div className="fade-in">
      <h1>📊 Калькулятор закята</h1>
      
      <div className="card">
        <div className="card-header">
          <h2 style={{ margin: 0 }}>Информация</h2>
          <span className="badge badge-info">2024</span>
        </div>
        <p style={{ color: '#666', marginTop: '12px' }}>
          Нисаб (2024): <strong>{formatNumber(524880)} ₽</strong> (87.48 г золота)
        </p>
        <p style={{ color: '#666' }}>
          Закят: <strong>2.5%</strong> от суммы сверх нисаба
        </p>
      </div>
      
      <div className="card">
        <h2>💰 Денежные средства</h2>
        <input
          type="number"
          className="input"
          placeholder="Введите сумму в рублях"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
      </div>

      <div className="card">
        <h2>🥇 Золото</h2>
        <input
          type="number"
          className="input"
          placeholder="Введите вес в граммах"
          value={gold}
          onChange={(e) => setGold(e.target.value)}
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          💡 Примерная цена: 6,000 ₽ за грамм
        </p>
      </div>

      <div className="card">
        <h2>🥈 Серебро</h2>
        <input
          type="number"
          className="input"
          placeholder="Введите вес в граммах"
          value={silver}
          onChange={(e) => setSilver(e.target.value)}
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          💡 Примерная цена: 80 ₽ за грамм
        </p>
      </div>

      <div className="card">
        <h2>🏪 Бизнес и инвестиции</h2>
        <input
          type="number"
          className="input"
          placeholder="Введите стоимость"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        />
      </div>

      <div className="card">
        <h2>💳 Долги к вычету</h2>
        <input
          type="number"
          className="input"
          placeholder="Введите сумму долгов"
          value={debts}
          onChange={(e) => setDebts(e.target.value)}
        />
      </div>

      <button className="button" onClick={calculateZakat}>
        🧮 Рассчитать закят
      </button>

      {result && (
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
          <h2 style={{ color: '#fff' }}>Результат расчёта</h2>
          
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
            <div style={{ marginBottom: '12px' }}>
              <strong>Общее состояние:</strong>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{formatNumber(result.totalWealth)} ₽</div>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <strong>Нисаб (порог):</strong>
              <div style={{ fontSize: '18px' }}>{formatNumber(result.nisab)} ₽</div>
            </div>
            
            {result.aboveNisab ? (
              <>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '8px', textAlign: 'center', marginBottom: '12px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>
                    {formatNumber(result.zakatDue)} ₽
                  </div>
                  <div style={{ fontSize: '14px' }}>Ваш закят (2.5%)</div>
                </div>
                
                <button className="button" style={{ background: '#fff', color: '#667eea' }}>
                  💳 Выплатить закят
                </button>
              </>
            ) : (
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.3)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>
                  ✅ Вы не обязаны выплачивать закят
                </div>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>
                  Ваше состояние ниже нисаба
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Zakat

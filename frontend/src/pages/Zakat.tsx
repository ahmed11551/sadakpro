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
    const zakatDue = aboveNisab ? totalWealth * 0.025 : 0

    setResult({
      totalWealth,
      aboveNisab,
      zakatDue,
      nisab: NISAB
    })
  }

  return (
    <div className="container">
      <h1>📊 Калькулятор закята</h1>
      
      <div className="card">
        <label>Денежные средства (₽)</label>
        <input
          type="number"
          className="input"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
      </div>

      <div className="card">
        <label>Золото (граммы)</label>
        <input
          type="number"
          className="input"
          value={gold}
          onChange={(e) => setGold(e.target.value)}
        />
      </div>

      <div className="card">
        <label>Серебро (граммы)</label>
        <input
          type="number"
          className="input"
          value={silver}
          onChange={(e) => setSilver(e.target.value)}
        />
      </div>

      <div className="card">
        <label>Бизнес и инвестиции (₽)</label>
        <input
          type="number"
          className="input"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        />
      </div>

      <div className="card">
        <label>Долги к вычету (₽)</label>
        <input
          type="number"
          className="input"
          value={debts}
          onChange={(e) => setDebts(e.target.value)}
        />
      </div>

      <button className="button" onClick={calculateZakat}>
        Рассчитать
      </button>

      {result && (
        <div className="card">
          <h2>Результат</h2>
          <p>Общее состояние: {result.totalWealth.toLocaleString()} ₽</p>
          <p>Нисаб: {result.nisab.toLocaleString()} ₽</p>
          <p>
            {result.aboveNisab ? 
              `Ваш закят: ${result.zakatDue.toLocaleString()} ₽ (2.5%)` :
              'Вы не обязаны выплачивать закят (ниже нисаба)'
            }
          </p>
          
          {result.aboveNisab && (
            <button className="button">
              Выплатить закят
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Zakat


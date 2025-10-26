import { useState } from 'react'
import '../App.css'

function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [fundId, setFundId] = useState<string>('')
  const [country, setCountry] = useState<string>('RU')

  const amounts = [100, 250, 500, 1000]

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount)
    if (amount > 0) {
      // TODO: Implement payment flow
      console.log('Donating:', amount, 'to fund:', fundId)
    }
  }

  return (
    <div className="container">
      <h1>💰 Пожертвовать</h1>
      
      <div className="card">
        <label>Выберите фонд</label>
        <select className="input" value={fundId} onChange={(e) => setFundId(e.target.value)}>
          <option value="">Все фонды</option>
          <option value="1">Фонд 1</option>
          <option value="2">Фонд 2</option>
        </select>
      </div>

      <div className="card">
        <label>Выберите страну</label>
        <select className="input" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="RU">Россия</option>
          <option value="KZ">Казахстан</option>
          <option value="UZ">Узбекистан</option>
        </select>
      </div>

      <div className="card">
        <h2>Сумма пожертвования</h2>
        <div className="input-group">
          {amounts.map(amount => (
            <button
              key={amount}
              className={selectedAmount === amount ? 'selected' : ''}
              onClick={() => setSelectedAmount(amount)}
            >
              {amount} ₽
            </button>
          ))}
        </div>
        
        <input
          type="number"
          className="input"
          placeholder="Или введите свою сумму"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value)
            setSelectedAmount(0)
          }}
        />
      </div>

      <button className="button" onClick={handleDonate}>
        Пожертвовать
      </button>
    </div>
  )
}

export default Donate


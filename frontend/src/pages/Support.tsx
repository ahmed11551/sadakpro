import { useState } from 'react'
import '../App.css'

function Support() {
  const [amount, setAmount] = useState<number>(0)
  
  const amounts = [500, 1000, 2500]

  const handleSupport = (sum: number) => {
    setAmount(sum)
    // TODO: Implement payment flow
    console.log('Supporting with amount:', sum)
  }

  return (
    <div className="container">
      <h1>🤲 Поддержать проект</h1>
      
      <div className="card">
        <p>Быстрое пожертвование для поддержки развития платформы</p>
      </div>

      <div className="card">
        <h2>Выберите сумму</h2>
        <div className="input-group">
          {amounts.map(sum => (
            <button
              key={sum}
              className={amount === sum ? 'selected' : ''}
              onClick={() => setAmount(sum)}
            >
              {sum} ₽
            </button>
          ))}
        </div>
        
        {amount > 0 && (
          <button className="button" onClick={() => handleSupport(amount)}>
            Поддержать {amount} ₽
          </button>
        )}
      </div>
    </div>
  )
}

export default Support


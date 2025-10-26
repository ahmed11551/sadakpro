import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Donate from './pages/Donate'
import Support from './pages/Support'
import Campaigns from './pages/Campaigns'
import Subscription from './pages/Subscription'
import Zakat from './pages/Zakat'
import Funds from './pages/Funds'
import History from './pages/History'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<string>('donate')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('tab') || 'donate'
    setActiveTab(tab)
    
    // Set theme color
    if (window.Telegram?.WebApp?.themeParams) {
      const theme = window.Telegram.WebApp.themeParams
      document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color || '#000000')
    }
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to={`/?tab=${activeTab}`} />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/support" element={<Support />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/zakat" element={<Zakat />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/history" element={<History />} />
        </Routes>
        
        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <button onClick={() => setActiveTab('donate')} className={activeTab === 'donate' ? 'active' : ''}>
            💰 Пожертвовать
          </button>
          <button onClick={() => setActiveTab('support')} className={activeTab === 'support' ? 'active' : ''}>
            🤲 Поддержать
          </button>
          <button onClick={() => setActiveTab('campaigns')} className={activeTab === 'campaigns' ? 'active' : ''}>
            🎯 Кампании
          </button>
          <button onClick={() => setActiveTab('subscription')} className={activeTab === 'subscription' ? 'active' : ''}>
            📅 Подписка
          </button>
          <button onClick={() => setActiveTab('zakat')} className={activeTab === 'zakat' ? 'active' : ''}>
            📊 Закят
          </button>
          <button onClick={() => setActiveTab('funds')} className={activeTab === 'funds' ? 'active' : ''}>
            🏛️ Фонды
          </button>
          <button onClick={() => setActiveTab('history')} className={activeTab === 'history' ? 'active' : ''}>
            📈 История
          </button>
        </nav>
      </div>
    </Router>
  )
}

export default App


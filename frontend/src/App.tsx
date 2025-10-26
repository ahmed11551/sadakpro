import { useState, useEffect } from 'react'
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
    // Get tab from URL
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

  // Render current page based on activeTab
  const renderCurrentPage = () => {
    switch(activeTab) {
      case 'donate': return <Donate />
      case 'support': return <Support />
      case 'campaigns': return <Campaigns />
      case 'subscription': return <Subscription />
      case 'zakat': return <Zakat />
      case 'funds': return <Funds />
      case 'history': return <History />
      default: return <Donate />
    }
  }

  return (
    <div className="app">
      <div className="content">
        {renderCurrentPage()}
      </div>
      
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
  )
}

export default App


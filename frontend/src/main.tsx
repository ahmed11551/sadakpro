import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Telegram WebApp API доступен глобально через window.Telegram.WebApp
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void
        expand: () => void
        themeParams: {
          bg_color?: string
          text_color?: string
          hint_color?: string
          button_color?: string
          button_text_color?: string
        }
        platform: string
        version: string
        initData: string
        initDataUnsafe: any
        MainButton: any
        BackButton: any
        HapticFeedback: any
      }
    }
  }
}

// Initialize Telegram WebApp
if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready()
  window.Telegram.WebApp.expand()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


# Структура проекта Садака-Пасс

## Полный список файлов

```
sadakpro/
│
├── 📄 README.md                    # Главный README с обзором проекта
├── 📄 SUMMARY.md                   # Итоги и что готово
├── 📄 TECH_SPEC.md                 # Техническая спецификация
├── 📄 SETUP.md                     # Подробные инструкции по настройке
├── 📄 DEPLOY.md                    # Инструкции по деплою
├── 📄 QUICK_START.md               # Быстрый старт
├── 📄 PROJECT_STRUCTURE.md         # Этот файл
├── 📄 package.json                  # Root package.json (scripts)
├── 📄 vercel.json                   # Конфигурация для Vercel
├── 📄 docker-compose.yml            # Docker Compose для локальной разработки
├── 📄 install.sh                    # Скрипт установки
├── 📄 quickstart.sh                 # Скрипт быстрого старта
├── 📄 .gitignore                    # Git ignore файл
│
├── 🔧 backend/                     # FastAPI Backend
│   ├── main.py                     # Главный файл приложения
│   ├── config.py                   # Конфигурация (настройки)
│   ├── database.py                 # Подключение к БД
│   ├── models.py                   # SQLAlchemy модели
│   ├── schemas.py                  # Pydantic схемы
│   ├── payments.py                 # Интеграция платежей
│   ├── telegram_auth.py            # Аутентификация Telegram
│   ├── requirements.txt            # Python зависимости
│   ├── Dockerfile                  # Docker образ
│   ├── env.example                 # Пример переменных окружения
│   │
│   └── routers/                    # API роутеры
│       ├── __init__.py
│       ├── auth.py                 # Аутентификация
│       ├── funds.py                # Фонды
│       ├── donations.py            # Пожертвования
│       ├── subscriptions.py       # Подписки
│       ├── campaigns.py            # Кампании
│       ├── zakat.py                # Калькулятор закята
│       └── reports.py               # Отчёты
│
├── 🤖 bot/                         # Telegram Bot
│   ├── main.py                     # Главный файл бота
│   ├── requirements.txt            # Python зависимости
│   ├── Dockerfile                  # Docker образ
│   └── env.example                 # Пример переменных окружения
│
└── 🎨 frontend/                     # React Mini App
    ├── package.json                 # Node.js зависимости
    ├── vite.config.ts              # Конфигурация Vite
    ├── tsconfig.json               # TypeScript конфигурация
    ├── tsconfig.node.json          # TS конфиг для node
    ├── index.html                  # Главный HTML
    ├── env.example                 # Пример переменных окружения
    │
    └── src/                        # Исходники
        ├── main.tsx                # Точка входа
        ├── App.tsx                 # Главный компонент
        ├── App.css                 # Стили приложения
        ├── index.css               # Глобальные стили
        ├── vite-env.d.ts           # Vite типы
        │
        └── pages/                  # Страницы
            ├── Donate.tsx          # Пожертвовать
            ├── Support.tsx         # Поддержать
            ├── Campaigns.tsx       # Кампании
            ├── Subscription.tsx    # Подписка
            ├── Zakat.tsx          # Закят
            ├── Funds.tsx          # Фонды
            └── History.tsx        # История
```

## Компоненты системы

### Backend (FastAPI)
- **9 роутеров** для всех функций
- **8 моделей** базы данных
- **Интеграция платежей**: YooKassa, CloudPayments
- **Аутентификация**: Telegram WebApp initData
- **База данных**: PostgreSQL через SQLAlchemy

### Bot (Python)
- **6 команд**: /start, /sadaqa, /support, /zakat, /campaigns, /partners
- **Inline кнопки** с web_app
- **Callback обработчики**

### Frontend (React)
- **7 страниц** приложения
- **Telegram WebApp SDK** интеграция
- **Адаптивный дизайн** с bottom navigation
- **TypeScript** для типобезопасности

### Документация
- **5 MD файлов** с инструкциями
- **Примеры конфигурации** для всех сервисов
- **Скрипты** для быстрой установки

### Инфраструктура
- **Docker Compose** для локальной разработки
- **Dockerfile** для каждого сервиса
- **Vercel** конфигурация
- **Примеры .env** файлов

## Статистика

- **Всего файлов**: ~50+
- **Строк кода**: ~2000+
- **API эндпойнтов**: 30+
- **React компонентов**: 7
- **Python модулей**: 15+
- **Документации**: 5 файлов

## Архитектура

```
Telegram User
     ↓
Telegram Bot ←→ Backend API (FastAPI)
     ↓               ↓
Mini App (React) ←→ PostgreSQL
     ↓
YooKassa / CloudPayments
```

## Технологии

- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Bot**: python-telegram-bot, asyncio
- **Frontend**: React, TypeScript, Vite
- **Deploy**: Vercel (frontend), Railway/Render (backend/bot), Supabase (DB)


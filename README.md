# Садака-Пасс - MubarakWay Mini App

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.11+-green.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)

**Telegram Mini App для благотворительных пожертвований**

</div>

## 📋 Структура проекта

```
sadakpro/
├── backend/          # FastAPI Backend (Python)
├── bot/              # Telegram Bot (Python)
├── frontend/         # React Mini App (TypeScript)
├── README.md         # Этот файл
├── TECH_SPEC.md      # Техническая спецификация
├── SETUP.md          # Инструкции по настройке
├── DEPLOY.md         # Инструкции по деплою
└── QUICK_START.md    # Быстрый старт
```

## 🚀 Быстрый старт

**👉 Начните с [START_HERE.md](./START_HERE.md) для пошаговых инструкций!**

Или см. [QUICK_START.md](./QUICK_START.md) для быстрого старта.

### Установка

```bash
# Установить зависимости для всех модулей
npm install
cd backend && pip install -r requirements.txt
cd ../bot && pip install -r requirements.txt
cd ../frontend && npm install
```

### Переменные окружения

Создайте `.env` файлы:

**backend/.env**
```
DATABASE_URL=postgresql://user:password@localhost:5432/sadaqa_db
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_SECRET_KEY=your_secret_key
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
CLOUDPAYMENTS_API_SECRET=your_secret
CORS_ORIGINS=http://localhost:3000
```

**bot/.env**
```
BOT_TOKEN=your_bot_token
WEBAPP_URL=https://your-miniapp.vercel.app
API_URL=http://localhost:8000
```

**frontend/.env.local**
```
VITE_API_URL=http://localhost:8000
VITE_TELEGRAM_BOT_NAME=your_bot_name
```

## 🛠️ Разработка

```bash
# Запустить все сервисы одновременно
npm run dev

# Или отдельно:
npm run dev:backend  # Backend на :8000
npm run dev:bot      # Telegram бот
npm run dev:frontend # Frontend на :3000
```

## 🎯 Возможности

- 💰 **Единоразовые пожертвования** с фильтрами по фондам и странам
- 🤲 **Быстрые донаты** (500/1000/2500 ₽)
- 🎯 **Целевые кампании** пользователей
- 📅 **Садака-подписка** (регулярные пожертвования)
- 📊 **Калькулятор закята** с авторасчётом
- 🏛️ **Каталог фондов-партнёров**
- 📈 **История и отчёты** транзакций

## 📦 Деплой

См. [DEPLOY.md](./DEPLOY.md) для подробных инструкций по деплою на:
- **Vercel** (Frontend)
- **Railway/Render** (Backend + Bot)
- **Supabase** (PostgreSQL)

## 📚 Документация

- [TECH_SPEC.md](./TECH_SPEC.md) - Техническая спецификация и архитектура
- [SETUP.md](./SETUP.md) - Подробная настройка
- [DEPLOY.md](./DEPLOY.md) - Инструкции по деплою
- [QUICK_START.md](./QUICK_START.md) - Быстрый старт

## 🔧 Требования

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Telegram Bot Token (от @BotFather)

## 📝 Лицензия

MIT License

## 🤝 Поддержка

Для вопросов и поддержки создайте issue в репозитории.


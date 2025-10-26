# Инструкция по настройке проекта

## Структура проекта

```
sadakpro/
├── backend/          # FastAPI Backend
├── bot/              # Telegram Bot
├── frontend/         # React Mini App
├── README.md
├── TECH_SPEC.md
├── DEPLOY.md
└── SETUP.md (этот файл)
```

## Шаг 1: Настройка переменных окружения

### Backend (.env в папке backend/)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sadaqa_db

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_SECRET_KEY=your_secret_key_for_miniapp

# Payments
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
CLOUDPAYMENTS_API_SECRET=your_api_secret

# Security
SECRET_KEY=generate-random-string-here

# CORS
CORS_ORIGINS=http://localhost:3000,https://your-app.vercel.app
```

### Bot (.env в папке bot/)
```env
BOT_TOKEN=your_bot_token_from_botfather
WEBAPP_URL=https://your-miniapp.vercel.app
API_URL=http://localhost:8000
```

### Frontend (.env.local в папке frontend/)
```env
VITE_API_URL=http://localhost:8000
VITE_TELEGRAM_BOT_NAME=your_bot_name
```

## Шаг 2: Создание базы данных

### Вариант А: Локальная PostgreSQL
```bash
# Установите PostgreSQL
# Windows: скачайте с postgresql.org
# macOS: brew install postgresql
# Linux: sudo apt install postgresql

# Создайте базу данных
createdb sadaqa_db

# Обновите DATABASE_URL в backend/.env
```

### Вариант Б: Supabase (Рекомендуется для продакшена)
1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте проект
3. Скопируйте Connection String (Database URL)
4. Вставьте в `DATABASE_URL`

## Шаг 3: Создание Telegram бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Введите имя бота (например: "Sadaqa Pass Bot")
4. Введите username бота (например: "sadaqapass_bot")
5. Скопируйте токен и вставьте в `bot/.env` и `backend/.env`

### Настройка Mini App

1. Отправьте `/newapp` боту в BotFather
2. Выберите созданного бота
3. Заполните данные:
   - Title: Садака-Пасс
   - Short name: sadaqapass
   - Description: Благотворительность
   - Icon: Загрузите иконку (512x512)
   - Web App URL: `https://your-miniapp.vercel.app`
4. Получите секретный ключ и вставьте в `TELEGRAM_SECRET_KEY`

## Шаг 4: Установка зависимостей

### Python (Backend & Bot)
```bash
# Создайте виртуальное окружение
python -m venv venv

# Активируйте
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Установите зависимости
pip install -r backend/requirements.txt
pip install -r bot/requirements.txt
```

### Node.js (Frontend)
```bash
cd frontend
npm install
```

## Шаг 5: Запуск приложения

### Запуск всего проекта (через concurrently)
```bash
npm run dev
```

### Или отдельно:

**Backend** (порт 8000)
```bash
cd backend
python main.py
```

**Bot**
```bash
cd bot
python main.py
```

**Frontend** (порт 3000)
```bash
cd frontend
npm run dev
```

## Шаг 6: Проверка

### 1. API работает
Откройте: http://localhost:8000/docs

### 2. Frontend работает
Откройте: http://localhost:3000

### 3. Bot отвечает
1. Найдите вашего бота в Telegram
2. Отправьте `/start`
3. Проверьте команды: `/sadaqa`, `/support`, `/zakat`

## Шаг 7: Настройка платежных провайдеров

### YooKassa
1. Зарегистрируйтесь на [kassa.yandex.ru](https://kassa.yandex.ru)
2. Создайте магазин
3. Получите Shop ID и Secret Key
4. Добавьте в `backend/.env`
5. Настройте webhook: `https://your-backend.vercel.app/api/v1/payments/webhook/yookassa`

### CloudPayments
1. Зарегистрируйтесь на [cloudpayments.ru](https://cloudpayments.ru)
2. Создайте публичный ID и пароль
3. Получите Secret Key для webhook'ов
4. Добавьте в `backend/.env`
5. Настройте webhook: `https://your-backend.vercel.app/api/v1/payments/webhook/cloudpayments`

## Troubleshooting

### База данных не подключается
- Проверьте DATABASE_URL
- Убедитесь, что PostgreSQL запущен
- Проверьте права пользователя

### Bot не отвечает
- Проверьте токен в `.env`
- Убедитесь, что бот запущен
- Проверьте логи: `python bot/main.py`

### Frontend не открывается в Telegram
- Проверьте WEBAPP_URL в bot/.env
- Убедитесь, что frontend задеплоен на Vercel
- Проверьте CORS настройки в backend

### API не работает
- Проверьте DATABASE_URL
- Убедитесь, что все зависимости установлены
- Запустите миграции (создаются автоматически)

## Дальнейшие шаги

1. Прочитайте [TECH_SPEC.md](./TECH_SPEC.md) для понимания архитектуры
2. Прочитайте [DEPLOY.md](./DEPLOY.md) для деплоя
3. Заполните базу данных тестовыми данными (фонды, кампании)
4. Настройте продакшн окружение

## Полезные ссылки

- [FastAPI документация](https://fastapi.tiangolo.com/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Mini Apps](https://core.telegram.org/bots/webapps)
- [Vite документация](https://vitejs.dev/)
- [Vercel документация](https://vercel.com/docs)


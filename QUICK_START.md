# Быстрый старт

## Вариант 1: Docker (Рекомендуется)

```bash
# 1. Склонируйте репозиторий
git clone <your-repo-url>
cd sadakpro

# 2. Создайте .env файлы
cp backend/.env.example backend/.env
cp bot/.env.example bot/.env
cp frontend/.env.example frontend/.env.local

# 3. Заполните переменные окружения в этих файлах

# 4. Запустите Docker Compose
docker-compose up -d

# 5. Откройте в браузере:
# - Backend API: http://localhost:8000/docs
# - Frontend: http://localhost:3000
```

## Вариант 2: Локальная установка

```bash
# 1. Склонируйте репозиторий
git clone <your-repo-url>
cd sadakpro

# 2. Установите зависимости (требуется Python 3.11 и Node.js 18+)
bash install.sh

# Или вручную:

# Python зависимости
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r backend/requirements.txt
pip install -r bot/requirements.txt

# Node зависимости
cd frontend
npm install
cd ..

# 3. Создайте .env файлы
cp backend/.env.example backend/.env
cp bot/.env.example bot/.env
cp frontend/.env.example frontend/.env.local

# 4. Заполните переменные окружения

# 5. Запустите базу данных (если локально)
createdb sadaqa_db

# Или используйте Docker только для PostgreSQL:
docker run -d --name sadaqa-postgres \
  -e POSTGRES_USER=sadaqa_user \
  -e POSTGRES_PASSWORD=sadaqa_pass \
  -e POSTGRES_DB=sadaqa_db \
  -p 5432:5432 \
  postgres:15

# 6. Запустите все сервисы
npm run dev

# Или отдельно:

# Backend (терминал 1)
cd backend && python main.py

# Bot (терминал 2)
cd bot && python main.py

# Frontend (терминал 3)
cd frontend && npm run dev
```

## Проверка

1. **Backend API**: http://localhost:8000/docs
2. **Frontend**: http://localhost:3000
3. **Telegram Bot**: Найдите бота и отправьте `/start`

## Следующие шаги

Прочитайте [SETUP.md](./SETUP.md) для детальной настройки и [DEPLOY.md](./DEPLOY.md) для деплоя на продакшн.


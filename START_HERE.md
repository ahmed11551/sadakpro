# 🚀 Начните здесь - Садака-Пасс

## Что это?

**Садака-Пасс** — полнофункциональная платформа для благотворительности в Telegram. Это включает:
- 💰 Пожертвования
- 🎯 Целевые кампании
- 📅 Подписки
- 📊 Калькулятор закята
- 🏛️ Каталог фондов
- 📈 История и отчёты

## Быстрый старт (5 минут)

### Вариант 1: Docker (Самый простой)

```bash
# 1. Скачайте проект
git clone <your-repo>
cd sadakpro

# 2. Создайте .env файлы
cp backend/env.example backend/.env
cp bot/env.example bot/.env
cp frontend/env.example frontend/.env.local

# 3. Откройте файлы .env и заполните их:
# - backend/.env - настройте базу данных и токены
# - bot/.env - укажите токен бота
# - frontend/.env.local - укажите URL бэкенда

# 4. Запустите
docker-compose up

# Готово! Откройте http://localhost:8000/docs
```

### Вариант 2: Локально (Более гибко)

```bash
# 1. Установите PostgreSQL
# Windows: https://www.postgresql.org/download/windows/
# macOS: brew install postgresql
# Linux: sudo apt install postgresql

# 2. Создайте базу данных
createdb sadaqa_db

# 3. Установите зависимости
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r backend/requirements.txt
pip install -r bot/requirements.txt

cd frontend && npm install && cd ..

# 4. Создайте .env файлы (см. вариант 1)

# 5. Запустите
npm run dev
```

## 📝 Необходимые настройки

### 1. Telegram Bot Token
1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. Скопируйте токен в `bot/.env` и `backend/.env`

### 2. Telegram Mini App
1. В @BotFather отправьте `/newapp`
2. Выберите вашего бота
3. Укажите:
   - Title: Садака-Пасс
   - Short name: sadaqapass
   - URL: https://your-miniapp.vercel.app
4. Скопируйте секретный ключ в `backend/.env`

### 3. База данных

**Вариант А: Локально**
```bash
createdb sadaqa_db
```

**Вариант Б: Supabase (Рекомендуется)**
1. Зайдите на [supabase.com](https://supabase.com)
2. Создайте проект
3. Скопируйте Connection String
4. Вставьте в `backend/.env` → `DATABASE_URL`

### 4. Платежи (Опционально)

**YooKassa** (для РФ карт):
1. Зарегистрируйтесь на [kassa.yandex.ru](https://kassa.yandex.ru)
2. Получите Shop ID и Secret Key
3. Добавьте в `backend/.env`

**CloudPayments** (международные):
1. Зарегистрируйтесь на [cloudpayments.ru](https://cloudpayments.ru)
2. Получите API Secret
3. Добавьте в `backend/.env`

## 🔍 Проверка

После запуска откройте:

- **Backend API**: http://localhost:8000/docs
- **Frontend**: http://localhost:3000
- **Telegram Bot**: Найдите бота и отправьте `/start`

## 📚 Документация

- **[QUICK_START.md](./QUICK_START.md)** - Быстрый старт
- **[SETUP.md](./SETUP.md)** - Подробная настройка
- **[DEPLOY.md](./DEPLOY.md)** - Деплой на продакшн
- **[TECH_SPEC.md](./TECH_SPEC.md)** - Техническая спецификация
- **[SUMMARY.md](./SUMMARY.md)** - Что готово

## ❓ Проблемы?

### База данных не подключается
- Проверьте `DATABASE_URL` в `backend/.env`
- Убедитесь, что PostgreSQL запущен
- Для локальной БД: `psql -c "CREATE DATABASE sadaqa_db;"`

### Бот не отвечает
- Проверьте токен в `bot/.env`
- Убедитесь, что бот запущен
- Проверьте логи: `python bot/main.py`

### Frontend не открывается в Telegram
- Проверьте `WEBAPP_URL` в `bot/.env`
- Должен быть реальный URL (не localhost)
- Задеплойте на Vercel для тестирования

### API не работает
- Проверьте, что backend запущен на :8000
- Проверьте `DATABASE_URL`
- Проверьте логи: `python backend/main.py`

## 🎯 Следующие шаги

1. ✅ Запустите проект локально
2. ✅ Заполните тестовые данные (фонды, кампании)
3. 📖 Прочитайте [TECH_SPEC.md](./TECH_SPEC.md)
4. 🚀 Задеплойте на продакшн ([DEPLOY.md](./DEPLOY.md))

## 💡 Полезные команды

```bash
# Запуск всех сервисов
npm run dev

# Только backend
npm run dev:backend

# Только bot
npm run dev:bot

# Только frontend
npm run dev:frontend

# Docker
docker-compose up -d
docker-compose logs -f
docker-compose down

# Миграции БД (создаются автоматически при первом запуске)
# Для ручного создания таблиц см. SETUP.md
```

## 🎉 Готово!

Проект полностью настроен и готов к использованию. Если возникнут вопросы, см. документацию или создайте issue.

**Удачи с разработкой! 🚀**


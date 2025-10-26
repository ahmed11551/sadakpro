# Деплой проекта

## 1. Подготовка

### Создание базы данных
Используйте **Supabase** или **Railway** для PostgreSQL:

```bash
# Создайте базу данных и получите URL
DATABASE_URL=postgresql://user:pass@host:5432/sadaqa_db
```

### Создание Telegram бота
1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot` и следуйте инструкциям
3. Получите токен бота
4. Получите токен для Mini App (через `/newapp`)

## 2. Настройка платежей

### YooKassa (для РФ)
1. Зарегистрируйтесь на [kassa.yandex.ru](https://kassa.yandex.ru)
2. Создайте магазин
3. Получите `shop_id` и `secret_key`

### CloudPayments (международно)
1. Зарегистрируйтесь на [cloudpayments.ru](https://cloudpayments.ru)
2. Получите `api_secret` для webhook'ов

## 3. Деплой Frontend (Vercel)

```bash
# Установите Vercel CLI
npm i -g vercel

# Зайдите в папку frontend
cd frontend

# Деплой
vercel

# Настройте переменные окружения в Vercel dashboard:
# - VITE_API_URL=https://your-backend.vercel.app
# - VITE_TELEGRAM_BOT_NAME=your_bot_name
```

## 4. Деплой Backend (Railway / Render)

### Railway
```bash
# Установите Railway CLI
npm i -g @railway/cli

# Инициализация
cd backend
railway login
railway init

# Добавьте переменные окружения через Railway dashboard:
# - DATABASE_URL (PostgreSQL)
# - TELEGRAM_BOT_TOKEN
# - TELEGRAM_SECRET_KEY
# - YOOKASSA_SHOP_ID
# - YOOKASSA_SECRET_KEY
# - CLOUDPAYMENTS_API_SECRET
# - CORS_ORIGINS (URL вашего frontend)

# Деплой
railway up
```

### Render
1. Создайте новый Web Service
2. Подключите GitHub репозиторий
3. Настройте:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Добавьте переменные окружения

## 5. Деплой Telegram бота

### Вариант 1: Railway/Render (Рекомендуется)
```bash
cd bot
railway init
# Добавьте переменные окружения
railway up
```

### Вариант 2: VPS
```bash
# На любом VPS (DigitalOcean, Hetzner и т.д.)
cd bot
pip install -r requirements.txt
python main.py

# Или с systemd для автозапуска:
sudo tee /etc/systemd/system/sadaqa-bot.service << EOF
[Unit]
Description=Sadaqa Telegram Bot
After=network.target

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/sadakpro/bot
ExecStart=/usr/bin/python3 main.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable sadaqa-bot
sudo systemctl start sadaqa-bot
```

## 6. Настройка базы данных

```bash
# Подключитесь к базе данных
psql $DATABASE_URL

# Или через Supabase SQL Editor выполните:
-- Создание таблиц выполнится автоматически при первом запуске backend
-- Или выполните вручную:

\i backend/migrations/init.sql
```

## 7. Webhook'и

### YooKassa Webhook
В настройках YooKassa укажите:
```
https://your-backend.vercel.app/api/v1/payments/webhook/yookassa
```

### CloudPayments Webhook
В настройках CloudPayments укажите:
```
https://your-backend.vercel.app/api/v1/payments/webhook/cloudpayments
```

## 8. Проверка

1. **API**: Откройте `https://your-backend.vercel.app/docs` (Swagger UI)
2. **Mini App**: Откройте Telegram бота и нажмите кнопку мини-приложения
3. **Проверьте команды бота**:
   - `/start`
   - `/sadaqa`
   - `/support`
   - `/zakat`

## 9. Мониторинг

- **Backend**: Railway/Render предоставляют логи
- **Bot**: Используйте Railway/Render логи или собственный VPS
- **Frontend**: Vercel Analytics

## 10. Troubleshooting

### Бот не отвечает
- Проверьте, что бот запущен: `railway logs` или `journalctl -u sadaqa-bot`
- Проверьте токен бота

### Mini App не открывается
- Убедитесь, что WEBAPP_URL указан правильно
- Проверьте CORS настройки в backend

### База данных не работает
- Проверьте DATABASE_URL
- Убедитесь, что таблицы созданы

## Production Checklist

- [ ] Настроены все переменные окружения
- [ ] База данных создана и заполнена тестовыми данными
- [ ] Платежные webhook'и настроены
- [ ] SSL сертификаты настроены
- [ ] Мониторинг настроен
- [ ] Бэкапы базы данных настроены
- [ ] Rate limiting работает
- [ ] Логирование настроено


# Техническая спецификация: Садака-Пасс

## 1. Общая концепция

Садака-Пасс — универсальный модуль внутри Telegram Mini App MubarakWay, объединяющий:
- Единоразовые и регулярные пожертвования (садака, садака-джария)
- Целевые кампании пользователей
- Каталог фондов-партнёров
- Калькулятор закята
- Система прозрачных отчётов

## 2. Архитектура

### Технологический стек
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL
- **Bot**: python-telegram-bot
- **Frontend**: React + TypeScript + Vite
- **Deployment**: Vercel + Railway/Supabase

### Основные компоненты

```
┌─────────────────┐
│  Telegram User  │
└────────┬────────┘
         │
         ├───────────────┐
         │               │
    ┌────▼────┐    ┌─────▼─────┐
    │  Bot    │    │  Mini App │
    │         │    │           │
    └────┬────┘    └─────┬─────┘
         │               │
         └───────┬───────┘
                 │
         ┌───────▼───────┐
         │   Backend API │
         │   (FastAPI)   │
         └───────┬───────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼────┐      ┌─────▼──────┐
   │PostgreSQL│      │  Payments  │
   │          │      │ YooKassa   │
   │          │      │CloudPayments
   └──────────┘      └────────────┘
```

## 3. Основные разделы Mini App

### Вкладки
1. **Пожертвовать** - единоразовые донаты с фильтрами
2. **Поддержать** - быстрые донаты (500/1000/2500 ₽)
3. **Целевые кампании** - создание и участие в кампаниях
4. **Подписка** - садака-подписка (садака-джария)
5. **Закят** - калькулятор закята
6. **Фонды-партнёры** - каталог фондов
7. **История/Отчёты** - транзакции и отчёты

## 4. API Эндпойнты

### Фонды
- `GET /api/v1/funds` - список фондов с фильтрами
- `GET /api/v1/funds/{id}` - детали фонда

### Пожертвования
- `POST /api/v1/donations/init` - создание пожертвования
- `GET /api/v1/donations/{id}/status` - статус
- `POST /api/v1/payments/webhook/yookassa` - webhook YooKassa
- `POST /api/v1/payments/webhook/cloudpayments` - webhook CloudPayments

### Подписки
- `POST /api/v1/subscriptions/init` - создать подписку
- `PATCH /api/v1/subscriptions/{id}` - обновить (pause/resume/cancel)
- `GET /api/v1/me/subscriptions` - мои подписки

### Кампании
- `GET /api/v1/campaigns` - список кампаний
- `POST /api/v1/campaigns` - создать кампанию
- `POST /api/v1/campaigns/{id}/donate` - пожертвовать в кампанию
- `GET /api/v1/campaigns/{id}/report` - отчёт кампании

### Закят
- `POST /api/v1/zakat/calc` - рассчитать
- `POST /api/v1/zakat/pay` - выплатить
- `GET /api/v1/zakat/history` - история

### История и отчёты
- `GET /api/v1/me/history` - моя история транзакций
- `GET /api/v1/reports/funds` - отчёты фондов
- `GET /api/v1/reports/summary` - сводка

## 5. Модели базы данных

### User
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  tg_id BIGINT UNIQUE NOT NULL,
  locale VARCHAR(10) DEFAULT 'ru',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Fund
```sql
CREATE TABLE funds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country_code VARCHAR(3),
  categories TEXT[],
  verified BOOLEAN DEFAULT FALSE,
  logo_url TEXT,
  short_desc TEXT,
  website TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Donation
```sql
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  fund_id INTEGER REFERENCES funds(id),
  campaign_id INTEGER,
  amount_value DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'RUB',
  provider VARCHAR(20),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP
);
```

## 6. Inline-команды бота

- `/sadaqa` - открыть вкладку "Пожертвовать"
- `/support` - быстрые донаты
- `/zakat` - калькулятор закята
- `/campaigns` - список кампаний
- `/partners` - каталог фондов

## 7. Платежная интеграция

### YooKassa (РФ-карты)
- BIN-проверка карты
- Webhook для обновления статусов
- Рекуррентные токены для подписок

### CloudPayments (международные)
- 3D-Secure поддержка
- Webhook для обновления статусов
- Рекуррентные платежи

## 8. Безопасность

- Проверка `initData` подписи Telegram WebApp
- Rate limiting (50 req/min per user)
- Хранение платежных токенов в безопасном хранилище
- Валидация HMAC для webhooks
- Логирование без чувствительных данных

## 9. Деплой

### Vercel (Frontend + API routes)
- Мини-приложение и статические файлы
- API роуты через serverless functions

### Railway (Backend + Bot)
- Backend API на постоянном сервере
- Telegram бот (long polling)

### Supabase (PostgreSQL)
- База данных
- Auth (опционально)


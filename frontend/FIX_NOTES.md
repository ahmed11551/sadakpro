# Исправления в Frontend

## Проблема

Ошибка при установке зависимостей:
```
npm ERR! code ETARGET
npm error notarget Не найдена соответствующая версия для @twa-dev/sdk@^2.0.4
```

## Решение

Вместо использования внешнего пакета `@twa-dev/sdk`, который может быть недоступен или иметь проблемы с версиями, используется нативный Telegram WebApp API.

### Изменения:

1. **package.json** - Удалена зависимость `@twa-dev/sdk`
2. **main.tsx** - Добавлены глобальные типы для `window.Telegram.WebApp`
3. **App.tsx** - Используется `window.Telegram.WebApp` вместо импорта пакета

### API

Telegram WebApp API доступен глобально через `window.Telegram.WebApp`:

```typescript
// Инициализация
window.Telegram.WebApp.ready()
window.Telegram.WebApp.expand()

// Доступ к параметрам
const theme = window.Telegram.WebApp.themeParams
const initData = window.Telegram.WebApp.initData
```

Это более надежный подход, так как использует официальный Telegram API без дополнительных зависимостей.


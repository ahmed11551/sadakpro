# Инструкция по загрузке на GitHub

## ✅ Шаг 1: Коммит уже создан

Код уже закоммичен в локальный репозиторий!

## 📤 Шаг 2: Создайте репозиторий на GitHub

### Вариант А: Через веб-интерфейс GitHub

1. Перейдите на https://github.com/new
2. Заполните форму:
   - **Repository name**: `sadakpro` или `sadaqa-pass`
   - **Description**: `Telegram Mini App для благотворительности`
   - **Visibility**: Public или Private
   - ⚠️ **НЕ** добавляйте README, .gitignore или лицензию (они уже есть)
3. Нажмите "Create repository"

### Вариант Б: Через GitHub CLI

```bash
gh repo create sadakpro --public --source=. --remote=origin
```

## 🚀 Шаг 3: Запушьте код на GitHub

После создания репозитория GitHub покажет команды. Выполните:

```bash
# Переименуйте ветку в main (если нужно)
git branch -M main

# Добавьте remote (замените URL на ваш)
git remote add origin https://github.com/YOUR_USERNAME/sadakpro.git

# Запушьте код
git push -u origin main
```

**ИЛИ** если используете SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/sadakpro.git
git push -u origin main
```

## ✅ Готово!

После push ваш репозиторий будет доступен на:
```
https://github.com/YOUR_USERNAME/sadakpro
```

## 📝 Полезные команды Git

```bash
# Проверить status
git status

# Посмотреть историю
git log --oneline

# Добавить новый файл
git add filename.py
git commit -m "Add new file"

# Обновить код на GitHub
git push

# Проверить remote
git remote -v
```

## 🔄 Обновление кода в будущем

После внесения изменений:

```bash
git add .
git commit -m "Описание изменений"
git push
```

---

**Важно**: Не коммитьте файлы с секретами (.env файлы). Они уже в .gitignore!


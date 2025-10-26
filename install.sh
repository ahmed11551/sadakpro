#!/bin/bash

echo "🚀 Установка Садака-Пасс проекта..."

# Проверка Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 не установлен"
    exit 1
fi

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен"
    exit 1
fi

# Создание виртуального окружения
echo "📦 Создание виртуального окружения..."
python3 -m venv venv
source venv/bin/activate

# Установка Python зависимостей
echo "📦 Установка backend зависимостей..."
pip install -r backend/requirements.txt

echo "📦 Установка bot зависимостей..."
pip install -r bot/requirements.txt

# Установка Node.js зависимостей
echo "📦 Установка frontend зависимостей..."
cd frontend
npm install
cd ..

echo "✅ Установка завершена!"
echo ""
echo "Следующие шаги:"
echo "1. Настройте .env файлы в backend/, bot/, frontend/"
echo "2. Прочитайте SETUP.md для детальных инструкций"
echo "3. Запустите проект: npm run dev"


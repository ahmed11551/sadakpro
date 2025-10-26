import asyncio
import logging
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from dotenv import load_dotenv
import os

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
WEBAPP_URL = os.getenv("WEBAPP_URL", "https://your-miniapp.vercel.app")

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Inline buttons
def get_main_menu():
    keyboard = [
        [
            InlineKeyboardButton("💰 Пожертвовать", web_app={'url': f"{WEBAPP_URL}?tab=donate"}),
            InlineKeyboardButton("🤲 Поддержать", web_app={'url': f"{WEBAPP_URL}?tab=support"})
        ],
        [
            InlineKeyboardButton("🎯 Целевые кампании", web_app={'url': f"{WEBAPP_URL}?tab=campaigns"}),
            InlineKeyboardButton("📅 Подписка", web_app={'url': f"{WEBAPP_URL}?tab=subscription"})
        ],
        [
            InlineKeyboardButton("📊 Калькулятор закята", web_app={'url': f"{WEBAPP_URL}?tab=zakat"}),
            InlineKeyboardButton("🏛️ Фонды", web_app={'url': f"{WEBAPP_URL}?tab=funds"})
        ],
        [
            InlineKeyboardButton("📈 История", web_app={'url': f"{WEBAPP_URL}?tab=history"})
        ]
    ]
    return InlineKeyboardMarkup(keyboard)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for /start command"""
    await update.message.reply_text(
        "Ассаляму алейкум! 👋\n\n"
        "Добро пожаловать в Садака-Пасс — мини-приложение для благотворительности.\n\n"
        "Выберите действие:",
        reply_markup=get_main_menu()
    )

async def sadaqa(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for /sadaqa command"""
    keyboard = [[InlineKeyboardButton("💵 Открыть донаты", web_app={'url': f"{WEBAPP_URL}?tab=donate"})]]
    await update.message.reply_text(
        "Пожертвуйте на благое дело 👇",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def support(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for /support command"""
    keyboard = [
        [
            InlineKeyboardButton("500 ₽", callback_data="donate:sum=500"),
            InlineKeyboardButton("1000 ₽", callback_data="donate:sum=1000"),
            InlineKeyboardButton("2500 ₽", callback_data="donate:sum=2500")
        ],
        [InlineKeyboardButton("🎁 Поддержать", web_app={'url': f"{WEBAPP_URL}?tab=support"})]
    ]
    await update.message.reply_text(
        "Быстрое пожертвование 👇",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def zakat(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for /zakat command"""
    keyboard = [[InlineKeyboardButton("🧮 Калькулятор закята", web_app={'url': f"{WEBAPP_URL}?tab=zakat"})]]
    await update.message.reply_text(
        "Рассчитайте ваш закят 👇",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def campaigns(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for /campaigns command"""
    keyboard = [[InlineKeyboardButton("🎯 Открыть кампании", web_app={'url': f"{WEBAPP_URL}?tab=campaigns"})]]
    await update.message.reply_text(
        "Целевые кампании 👇",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def partners(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for /partners command"""
    keyboard = [[InlineKeyboardButton("🏛️ Каталог фондов", web_app={'url': f"{WEBAPP_URL}?tab=funds"})]]
    await update.message.reply_text(
        "Фонды-партнёры 👇",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def button(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handler for button callbacks"""
    query = update.callback_query
    await query.answer()
    
    data = query.data
    
    if data.startswith("donate:sum="):
        amount = data.split("sum=")[1]
        await query.edit_message_text(
            f"Пожертвование {amount} ₽\n\n"
            "Откройте мини-приложение для завершения оплаты 👇",
            reply_markup=InlineKeyboardMarkup([[
                InlineKeyboardButton("💳 Оплатить", web_app={'url': f"{WEBAPP_URL}?donate={amount}"})
            ]])
        )

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """Log the error and send a message to the user"""
    logger.error(msg="Exception while handling an update:", exc_info=context.error)

def main():
    """Start the bot"""
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("sadaqa", sadaqa))
    application.add_handler(CommandHandler("support", support))
    application.add_handler(CommandHandler("zakat", zakat))
    application.add_handler(CommandHandler("campaigns", campaigns))
    application.add_handler(CommandHandler("partners", partners))
    
    # Callback query handler
    application.add_handler(CallbackQueryHandler(button))
    
    # Error handler
    application.add_error_handler(error_handler)
    
    # Start the bot
    logger.info("Bot started!")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()


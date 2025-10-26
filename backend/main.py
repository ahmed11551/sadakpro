from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from contextlib import asynccontextmanager

from config import settings
from database import engine, Base
from routers import funds, donations, subscriptions, campaigns, zakat, reports, auth, replika

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown

app = FastAPI(
    title="Садака-Пасс API",
    description="API для благотворительности MubarakWay с интеграцией bot.e-replika.ru",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(funds.router, prefix="/api/v1", tags=["funds"])
app.include_router(donations.router, prefix="/api/v1", tags=["donations"])
app.include_router(subscriptions.router, prefix="/api/v1", tags=["subscriptions"])
app.include_router(campaigns.router, prefix="/api/v1", tags=["campaigns"])
app.include_router(zakat.router, prefix="/api/v1", tags=["zakat"])
app.include_router(reports.router, prefix="/api/v1", tags=["reports"])
app.include_router(replika.router, prefix="/api/v1/replika", tags=["replika-integration"])

@app.get("/")
async def root():
    return {
        "message": "Садака-Пасс API",
        "status": "running",
        "integrations": {
            "bot.e-replika.ru": "active"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

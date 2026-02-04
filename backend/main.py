from fastapi import FastAPI
from api.tasks import router as tasks_router
from database.session import engine
from models.task import Task
from models.user import User
from sqlmodel import create_engine
from fastapi.middleware.cors import CORSMiddleware
import os

# Create the FastAPI app
app = FastAPI(
    title="Todo App API",
    description="Secure, multi-user Todo application API with JWT authentication",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(tasks_router)

@app.on_event("startup")
async def startup_event():
    """Initialize database tables on startup"""
    from sqlmodel import SQLModel
    # Create tables
    SQLModel.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Todo App API - Hackathon II Phase II"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
from sqlmodel import create_engine
from sqlalchemy import event
from sqlalchemy.engine import Engine
import sqlite3
import os
from urllib.parse import urlparse
import psycopg2

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

def get_engine():
    # For PostgreSQL (Neon)
    if DATABASE_URL and 'postgresql' in DATABASE_URL:
        engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            echo=False  # Set to True for SQL debugging
        )
    else:
        # Fallback to SQLite for development/testing
        engine = create_engine("sqlite:///./todo_app.db", echo=False)

    return engine


engine = get_engine()


def get_session():
    from sqlmodel import Session
    with Session(engine) as session:
        yield session
# Database Schema Specification

## Purpose and Scope

Define the database schema using SQLModel ORM for Neon Serverless PostgreSQL, supporting user isolation and task management functionality.

## Database Configuration

- **Engine**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Connection**: Via DATABASE_URL environment variable
- **Schema Management**: Automatic initialization with Alembic support

## Table Definitions

### users Table
*Note: Better Auth manages user accounts; this table may not be needed if relying solely on Better Auth*

If custom user data is required:
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### tasks Table
Primary table for storing user tasks with multi-tenant isolation:

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_tasks_user_id (user_id),
    INDEX idx_tasks_completed (completed),
    INDEX idx_tasks_due_date (due_date)
);
```

## SQLModel Models

### Task Model
```python
from sqlmodel import SQLModel, Field, Column, DateTime
from datetime import datetime
import uuid

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    due_date: datetime | None = Field(sa_column=Column(DateTime(timezone=True)))

class Task(TaskBase, table=True):
    __tablename__ = "tasks"

    id: int | None = Field(default=None, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, sa_column=Column(DateTime(timezone=True)))
    updated_at: datetime = Field(default_factory=datetime.utcnow, sa_column=Column(DateTime(timezone=True)))

    def __setattr__(self, name, value):
        if name == 'updated_at':
            super().__setattr__('updated_at', datetime.utcnow())
        super().__setattr__(name, value)

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: int
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class TaskUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=1000)
    completed: bool | None = None
    due_date: datetime | None = Field(default=None, sa_column=Column(DateTime(timezone=True)))
```

## Indexing Strategy

- Primary keys indexed automatically
- Foreign key columns indexed for joins
- Frequently queried columns indexed (user_id, completed)
- Timestamp columns indexed for sorting/filtering

## Security Requirements

- All queries must filter by user_id for multi-tenant isolation
- Parameterized queries to prevent SQL injection
- Proper foreign key constraints to maintain referential integrity
- Cascade deletes where appropriate

## Validation Rules

- Title: 1-255 characters
- Description: 0-1000 characters
- Completed: boolean with default false
- Due date: future dates or null allowed
- User ID: must reference valid user
- Created/updated timestamps: auto-managed

## Performance Considerations

- Efficient indexing for common query patterns
- Connection pooling for high concurrency
- Prepared statements for repeated queries
- Proper transaction management

## Migration Strategy

- Use Alembic for schema evolution
- Maintain backward compatibility where possible
- Document breaking changes in history
- Test migrations in staging environment
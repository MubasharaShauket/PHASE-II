from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
import uuid
from models.task import Task, TaskCreate, TaskRead, TaskUpdate
from database.session import get_session
from auth.jwt import get_current_user

router = APIRouter(prefix="/api/{user_id}", tags=["tasks"])


@router.get("/tasks", response_model=List[TaskRead])
async def get_tasks(user_id: str, current_user: dict = Depends(get_current_user), session: Session = Depends(get_session)):
    # Verify that the user_id in the URL matches the authenticated user
    try:
        requested_user_id = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if current_user["user_id"] != requested_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this user's tasks")

    # Query tasks for the authenticated user
    statement = select(Task).where(Task.user_id == requested_user_id)
    tasks = session.exec(statement).all()
    return tasks


@router.post("/tasks", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task: TaskCreate,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the user_id in the URL matches the authenticated user
    try:
        requested_user_id = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if current_user["user_id"] != requested_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to create tasks for this user")

    # Create new task
    db_task = Task.model_validate(task)
    db_task.user_id = requested_user_id

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.get("/tasks/{id}", response_model=TaskRead)
async def get_task(
    user_id: str,
    id: int,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the user_id in the URL matches the authenticated user
    try:
        requested_user_id = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if current_user["user_id"] != requested_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this user's tasks")

    # Query specific task
    statement = select(Task).where(Task.id == id, Task.user_id == requested_user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    return db_task


@router.put("/tasks/{id}", response_model=TaskRead)
async def update_task(
    user_id: str,
    id: int,
    task_update: TaskUpdate,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the user_id in the URL matches the authenticated user
    try:
        requested_user_id = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if current_user["user_id"] != requested_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this user's tasks")

    # Query specific task
    statement = select(Task).where(Task.id == id, Task.user_id == requested_user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update task with provided values
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.patch("/tasks/{id}/complete", response_model=TaskRead)
async def toggle_task_complete(
    user_id: str,
    id: int,
    task_update: TaskUpdate,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the user_id in the URL matches the authenticated user
    try:
        requested_user_id = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if current_user["user_id"] != requested_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this user's tasks")

    # Query specific task
    statement = select(Task).where(Task.id == id, Task.user_id == requested_user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update completion status
    if task_update.completed is not None:
        db_task.completed = task_update.completed

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task


@router.delete("/tasks/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    id: int,
    current_user: dict = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Verify that the user_id in the URL matches the authenticated user
    try:
        requested_user_id = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    if current_user["user_id"] != requested_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this user's tasks")

    # Query specific task
    statement = select(Task).where(Task.id == id, Task.user_id == requested_user_id)
    db_task = session.exec(statement).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(db_task)
    session.commit()

    return
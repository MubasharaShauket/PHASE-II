'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/types/task';
import { apiClient } from '@/lib/api';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user?.id) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const userTasks = await apiClient.getTasks(user.id);
      setTasks(userTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: TaskFormData) => {
    if (!user?.id) return;

    try {
      const newTask = await apiClient.createTask(user.id, taskData);
      setTasks([...tasks, newTask]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId: number, taskData: Partial<Task>) => {
    if (!user?.id) return;

    try {
      const updatedTask = await apiClient.updateTask(user.id, taskId, taskData);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    if (!user?.id) return;

    try {
      const updatedTask = await apiClient.toggleTaskComplete(user.id, taskId, completed);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!user?.id) return;

    try {
      await apiClient.deleteTask(user.id, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-gray-600">Please sign in to access your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New Task
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <TaskForm
                initialData={editingTask || undefined}
                onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
                onCancel={cancelEdit}
              />
            </div>
          )}

          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-600">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No tasks yet. Create your first task!</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onEdit={startEditing}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </main>
    </div>
  );
}
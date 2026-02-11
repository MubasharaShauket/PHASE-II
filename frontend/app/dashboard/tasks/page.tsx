'use client';

import { useState, useEffect } from 'react';
import { Task, TaskFormData } from '@/types/task';
import { apiClient } from '@/lib/api';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { PlusIcon, ClipboardDocumentListIcon, UserCircleIcon } from '@heroicons/react/24/outline';

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
      setTasks(prev => [...prev, newTask]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId: number, taskData: Partial<Task>) => {
    if (!user?.id) return;

    try {
      const updatedTask = await apiClient.updateTask(user.id, taskId, taskData);
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleToggleComplete = async (taskId: number, completed: boolean) => {
    if (!user?.id) return;

    try {
      const updatedTask = await apiClient.toggleTaskComplete(user.id, taskId, completed);
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!user?.id) return;

    try {
      await apiClient.deleteTask(user.id, taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center animate-pulse">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="text-center">
            <UserCircleIcon className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-gray-600">Please sign in to access your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 space-y-4 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center truncate">
                  <ClipboardDocumentListIcon className="h-8 w-8 mr-3 text-primary-600 flex-shrink-0" />
                  <span className="truncate">My Tasks</span>
                </h1>
                <p className="mt-2 text-gray-600 truncate">
                  {tasks.length > 0 
                    ? `You have ${tasks.filter(t => !t.completed).length} pending tasks`
                    : 'Get started by creating your first task'}
                </p>
              </div>
              
              <div className="sm:ml-4 mt-2 sm:mt-0">
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setShowForm(true);
                  }}
                  className="btn-primary flex items-center justify-center px-5 py-3 text-base font-medium w-full sm:w-auto"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add New Task
                </button>
              </div>
            </div>

            {showForm && (
              <div className="mb-8 animate-slide-in">
                <TaskForm
                  initialData={editingTask || undefined}
                  onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
                  onCancel={cancelEdit}
                />
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <ClipboardDocumentListIcon className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks yet</h3>
                <p className="mt-1 text-gray-500">Get started by creating a new task.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary inline-flex items-center"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create your first task
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <TaskList
                  tasks={tasks}
                  onToggleComplete={handleToggleComplete}
                  onEdit={startEditing}
                  onDelete={handleDeleteTask}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
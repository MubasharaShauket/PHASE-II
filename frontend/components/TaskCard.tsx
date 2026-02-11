'use client';

import { Task } from '@/types/task';
import { CheckCircleIcon, XCircleIcon, PencilIcon, TrashIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      if (window.confirm('Are you sure you want to delete this task?')) {
        onDelete(task.id);
      } else {
        setIsDeleting(false);
      }
    }, 300);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`card transition-all duration-300 ${isDeleting ? 'opacity-50' : 'opacity-100'} ${task.completed ? 'bg-gradient-to-br from-green-50/50 to-emerald-50/50 task-completed' : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50'}`}>
      <div className="flex items-start">
        <button
          onClick={handleToggleComplete}
          className={`h-6 w-6 flex items-center justify-center rounded-full border-2 flex-shrink-0 mt-1 ${
            task.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-400'
          } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <CheckCircleIcon className="h-5 w-5" />
          )}
        </button>
        
        <div className="ml-4 flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-1 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={`text-gray-600 mb-3 ${task.completed ? 'text-gray-400' : ''}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 text-xs">
            {task.due_date && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                task.completed 
                  ? 'bg-gray-100 text-gray-500' 
                  : new Date(task.due_date) < new Date() 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
              }`}>
                <CalendarIcon className="h-3 w-3 mr-1" />
                {formatDate(task.due_date)}
              </span>
            )}
            
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              <ClockIcon className="h-3 w-3 mr-1" />
              {formatTime(task.created_at)}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Edit task"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete task"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
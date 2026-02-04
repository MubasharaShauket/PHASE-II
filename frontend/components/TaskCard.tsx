'use client';

import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const handleToggleComplete = () => {
    onToggleComplete(task.id, !task.completed);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`bg-white shadow rounded-lg p-4 border-l-4 ${task.completed ? 'border-green-500' : 'border-yellow-500'}`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 mt-0.5"
        />
        <div className="ml-3 flex-1 min-w-0">
          <h3 className={`text-base font-medium truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm ${task.completed ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
              {task.description}
            </p>
          )}
          {task.due_date && (
            <p className={`text-xs mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2 ml-2">
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
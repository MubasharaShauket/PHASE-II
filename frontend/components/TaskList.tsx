'use client';

import { Task } from '@/types/task';
import TaskCard from './TaskCard';
import { FolderOpenIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-8">
      {incompleteTasks.length > 0 ? (
        <div className="animate-fade-in">
          <div className="flex items-center mb-4">
            <FolderOpenIcon className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Pending Tasks</h3>
            <span className="ml-2 bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {incompleteTasks.length}
            </span>
          </div>
          <div className="space-y-4">
            {incompleteTasks.map((task, index) => (
              <div key={task.id} className={`animate-slide-in`} style={{ animationDelay: `${index * 50}ms` }}>
                <TaskCard
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 animate-fade-in">
          <FolderOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pending tasks</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="pt-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-800">Completed Tasks</h3>
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          <div className="space-y-4">
            {completedTasks.map((task, index) => (
              <div key={task.id} className={`animate-slide-in`} style={{ animationDelay: `${index * 50}ms` }}>
                <TaskCard
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
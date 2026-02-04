export interface Task {
  id: number;
  user_id: string; // UUID as string
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface TaskFormData {
  title: string;
  description?: string;
  due_date?: string; // ISO date string
  completed?: boolean;
}
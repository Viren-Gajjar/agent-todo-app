export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  notes?: string;
  priority: Priority;
  tags: string[];
  listId: string;
  due?: string;
  repeat?: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  order: number;
  subtasks?: Todo[];
}

export interface List {
  id: string;
  name: string;
}

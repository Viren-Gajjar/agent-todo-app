import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo, List } from './types';

interface State {
  todos: Todo[];
  lists: List[];
  currentListId: string | null;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  updateTodo: (id: string, changes: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  reorderTodos: (ids: string[]) => void;
  addList: (name: string) => void;
  setCurrentList: (id: string | null) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const now = () => new Date().toISOString();

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      todos: [],
      lists: [],
      currentListId: null,
      addTodo: (todo) =>
        set((state) => {
          const id = generateId();
          const timestamp = now();
          return {
            todos: [
              ...state.todos,
              {
                ...todo,
                id,
                createdAt: timestamp,
                updatedAt: timestamp,
                completed: false,
                order: state.todos.length,
              },
            ],
          };
        }),
      updateTodo: (id, changes) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? { ...t, ...changes, updatedAt: now() } : t)),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed, updatedAt: now() } : t
          ),
        })),
      reorderTodos: (ids) =>
        set((state) => ({
          todos: ids.map((id, index) => {
            const todo = state.todos.find((t) => t.id === id)!;
            return { ...todo, order: index };
          }),
        })),
      addList: (name) =>
        set((state) => {
          const id = generateId();
          return {
            lists: [...state.lists, { id, name }],
            currentListId: id,
          };
        }),
      setCurrentList: (id) => set({ currentListId: id }),
    }),
    {
      name: 'todo-app-storage',
    }
  )
);

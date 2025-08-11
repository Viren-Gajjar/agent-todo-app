import React, { useState } from 'react';
import { useStore } from './store';
import type { Priority } from './types';

const priorities: Priority[] = ['low', 'medium', 'high'];

const App: React.FC = () => {
  const {
    todos,
    lists,
    currentListId,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    addList,
    setCurrentList,
  } = useStore();

  const [newListName, setNewListName] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [due, setDue] = useState('');
  const [tags, setTags] = useState('');
  const [search, setSearch] = useState('');

  const filteredTodos = todos
    .filter((t) => (currentListId ? t.listId === currentListId : true))
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.join(' ').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.order - b.order);

  const handleAddTodo = () => {
    if (!title.trim()) return;
    addTodo({
      title: title.trim(),
      notes: notes.trim() || undefined,
      priority,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      listId: currentListId || '',
      due: due || undefined,
      repeat: undefined,
      order: 0,
    });
    setTitle('');
    setNotes('');
    setPriority('medium');
    setDue('');
    setTags('');
  };

  const handleAddList = () => {
    if (!newListName.trim()) return;
    addList(newListName.trim());
    setNewListName('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded"
        >
          Toggle Theme
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <aside className="md:w-1/4">
          <h2 className="font-semibold mb-2">Lists</h2>
          <ul>
            <li key="all">
              <button
                className={`block w-full text-left px-2 py-1 rounded ${
                  currentListId === null ? 'bg-indigo-500 text-white' : ''
                }`}
                onClick={() => setCurrentList(null)}
              >
                All
              </button>
            </li>
            {lists.map((list) => (
              <li key={list.id}>
                <button
                  className={`block w-full text-left px-2 py-1 rounded ${
                    currentListId === list.id ? 'bg-indigo-500 text-white' : ''
                  }`}
                  onClick={() => setCurrentList(list.id)}
                >
                  {list.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <input
              type="text"
              className="w-full px-2 py-1 border rounded mb-2"
              placeholder="New list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button
              className="w-full px-2 py-1 bg-indigo-600 text-white rounded"
              onClick={handleAddList}
            >
              Add List
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-2 py-1 border rounded mb-2"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <input
                type="text"
                className="px-2 py-1 border rounded"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="px-2 py-1 border rounded"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <select
                className="px-2 py-1 border rounded"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="px-2 py-1 border rounded"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
              <textarea
                className="px-2 py-1 border rounded col-span-1 md:col-span-2 lg:col-span-3"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
          </div>

          <div>
            {filteredTodos.length === 0 && (
              <p className="text-gray-500">No tasks yet.</p>
            )}
            <ul className="space-y-2">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-white dark:bg-gray-800 p-3 rounded shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="mr-2"
                      />
                      <span
                        className={`font-medium ${
                          todo.completed ? 'line-through' : ''
                        }`}
                      >
                        {todo.title}
                      </span>
                      {todo.due && (
                        <span className="ml-2 text-xs text-gray-500">
                          Due: {new Date(todo.due).toLocaleDateString()}
                        </span>
                      )}
                      <div className="text-xs">
                        {todo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white rounded px-1 py-0.5 mr-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="text-sm text-red-500"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {todo.notes && (
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {todo.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

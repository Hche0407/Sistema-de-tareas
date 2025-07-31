import './App.css';
import { useState } from 'react';
import Todo from './components/todo';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
  priority: number;
};

function App() {
  const [input, setInput] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priority, setPriority] = useState<number>(1);

  const addTodo = () => {
    if (!input.trim()) return;
    const newtodo: TodoItem = {
      id: Date.now(),
      text: input,
      completed: false,
      priority: priority,
    };
    setTodos((prevTodos) => [...prevTodos, newtodo]);
    setInput('');
    setPriority(1); // Reinicia la prioridad al valor por defecto
  };

  const completeTodo = (id: number) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => a.priority - b.priority);

  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="bg-red-950 min-h-screen flex justify-center items-center">
      <div className="max-w-[500px] w-[90%] bg-slate-950 p-4 rounded-md shadow-md">
        <h1 className="text-center text-white text-xl font-bold">TAREAS DEL DÍA</h1>

        <div className="flex gap-2 justify-center mt-8 flex-wrap">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Añadir Tarea"
            className="flex-1 border-2 outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="border-2 border-gray-500 rounded-md p-2 text-white bg-slate-800"
          >
            <option value={1}>Alta</option>
            <option value={2}>Media</option>
            <option value={3}>Baja</option>
          </select>
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-red-900 cursor-pointer rounded-md text-sm hover:bg-red-800 text-white"
          >
            Añadir tarea
          </button>
        </div>

        <div className="flex justify-between mt-4 text-white text-sm">
          <span>Total: {totalCount}</span>
          <span>Completadas: {completedCount}</span>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setFilter('all')} className="px-4 py-2 bg-red-900 cursor-pointer rounded-md text-sm hover:bg-red-800 text-white">Todas</button>
          <button onClick={() => setFilter('completed')} className="px-4 py-2 bg-red-900 cursor-pointer rounded-md text-sm hover:bg-red-800 text-white">Completadas</button>
          <button onClick={() => setFilter('pending')} className="px-4 py-2 bg-red-900 cursor-pointer rounded-md text-sm hover:bg-red-800 text-white">Pendientes</button>
        </div>

        <div>
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))
          ) : (
            <h1 className="text-center text-white text-xl my-2">Añade una tarea</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

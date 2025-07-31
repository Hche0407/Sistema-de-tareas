import './App.css';
import { useState } from 'react';
import Todo from './components/todo';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [input, setInput] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newtodo: TodoItem = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newtodo]);
    setInput('');
  };

  const completeTodo = (id: number) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo

    )
    );


  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));

  }
  return (
    <>
      <div className="bg-red-950 min-h-screen flex justify-center items-center">
        <div className="max-w-[500px] w-[90%] bg-slate-950 p-4 rounded-md shadow-md">
          <h1 className="text-center text-white text-xl font-bold">TAREAS DEL DÍA</h1>

          <div className="flex gap-2 justify-center mt-8">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Añadir Tarea"
              className="flex-1 border-2 outline-none border-gray-500 text-white placeholder-gray-500 p-2 rounded-md focus:border-white"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-red-900 cursor-pointer rounded-md text-sm hover:bg-red-800 text-white"
            >
              Añadir tarea
            </button>
          </div>
          <div>
            <h1 className="text-center text-white text-xl">Tareas</h1>
            {todos.length > 0 ? (
              <>

                {todos.map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                  />
                ))}
              </>
            ) : (
              <h1 className="text-center text-white text-xl my-4">Añade una tarea</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

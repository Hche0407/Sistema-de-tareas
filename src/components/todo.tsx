import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

type TodoProp = {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    priority: number;
  };
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, newText: string) => void;
};

export default function Todo({ todo, completeTodo, deleteTodo, updateTodo }: TodoProp) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      updateTodo(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className='bg-red-900 p-2 rounded-md flex justify-between items-center my-4 text-white'>
      <div className="flex-1">
        {isEditing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            className="w-full p-1 text-black rounded"
            autoFocus
          />
        ) : (
          <p
            className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
            onClick={handleEdit}
          >
            {todo.text}
          </p>
        )}
        <p className="text-sm text-gray-300">Prioridad: {todo.priority}</p>
      </div>

      <div className='flex items-center gap-2 cursor-pointer'>
        <FaCheckCircle className='hover:text-gray-500' onClick={() => completeTodo(todo.id)} />
        <FaTrash className='hover:text-gray-500' onClick={() => deleteTodo(todo.id)} />
      </div>
    </div>
  );
}

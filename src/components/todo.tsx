import { FaCheckCircle, FaTrash } from 'react-icons/fa';

type TodoProp = {
  todo: {
    id: number,
    text: string,
    completed: boolean;

  };
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function Todo({ todo, completeTodo, deleteTodo }: TodoProp) {
  return (
    <div>

      <div className='bg-red-900 p-2 rounded-md flex justify-between items-center my-4 text-white '>
        <p className={`text-white ${todo.completed === true ? "line-through" : ""
          }`}>{todo.text} </p>

        <div className='flex items-center gap-2 cursor-pointer '>
          <FaCheckCircle className='hover:text-gray-500' onClick={() => completeTodo(todo.id)} />
          <FaTrash className='hover:text-gray-500' onClick={() => deleteTodo(todo.id)} />
        </div>
      </div>
    </div>
  );
}

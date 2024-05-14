import React, { useState } from 'react';
import { useSettings } from '../../Context/Settings';
import './styles.scss';

interface TodoItem {
  id: string;
  text: string;
  assignee: string;
  difficulty: number;
  completed: boolean;
}

const Todo: React.FC = () => {
  const { displayCount, hideCompleted } = useSettings();
  const [todoText, setTodoText] = useState('');
  const [assignee, setAssignee] = useState('');
  const [difficulty, setDifficulty] = useState(4);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleAddTodo = () => {
    if (todoText.trim() === '') {
      console.log('Todo text cannot be empty');
      return;
    }

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: todoText,
      assignee,
      difficulty,
      completed: false,
    };

    setTodoList([...todoList, newTodo]);
    setTodoText('');
    setAssignee('');
    setDifficulty(4);
  };

  const handleToggleCompleted = (id: string) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodoList(updatedTodoList);
  };

  return (
    <div className="todo-container">
      <h2>To Do List</h2>
      <label>
        Todo Item:
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter todo item"
        />
      </label>
      <label>
        Assigned To:
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Enter assignee"
        />
      </label>
      <label>
        Difficulty:
        <input
          type="range"
          value={difficulty}
          onChange={(e) => setDifficulty(parseInt(e.target.value))}
          min={1}
          max={5}
        />
        {difficulty}
      </label>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={() => setShowCompleted(!hideCompleted)}>
        {hideCompleted ? 'Hide Completed' : 'Show Completed'}
      </button>
      <ul>
        {todoList
          .filter(todo => !todo.completed || !hideCompleted)
          .slice(0, displayCount)
          .map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo.id)}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text} - {todo.assignee} - {todo.difficulty}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;

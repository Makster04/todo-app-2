// Components/Todo/index.tsx
import React, { useState } from 'react';
import { useSettings } from '../../Context/Settings';

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
    // Check if the todoText is empty before adding the todo item
    if (todoText.trim() === '') {
      console.log('Todo text cannot be empty');
      return;
    }

    // Create a new todo item
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: todoText,
      assignee,
      difficulty,
      completed: false,
    };

    // Add the new todo item to the todo list
    setTodoList([...todoList, newTodo]);

    // Clear input fields after adding todo item
    setTodoText('');
    setAssignee('');
    setDifficulty(4); // Reset difficulty to default
  };

  const handleToggleCompleted = (id: string) => {
    // Toggle the completed status of the todo item with the given id
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
    <div>
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

      {/* Render the todo items */}
      <ul>
        {todoList
          .filter(todo => !todo.completed || !hideCompleted) // Filter based on completion status and hideCompleted setting
          .slice(0, displayCount) // Limit display to displayCount
          .map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text} - {todo.assignee} - {todo.difficulty}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;

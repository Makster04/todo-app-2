import React from 'react';
import { useSettings } from '../../Context/Settings';

const TodoList: React.FC = () => {
  const settings = useSettings();

  return (
    <div>
      <h2>Todo List</h2>
      <p>Show completed: {settings.showCompleted.toString()}</p>
      <p>Display count: {settings.displayCount}</p>
      <p>Default sort: {settings.defaultSort}</p>
      {/* Add Todo list items here */}
    </div>
  );
}

export default TodoList;

import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';

interface Item {
  id: string;
  text: string;
  assignee: string;
  difficulty: number;
  complete: boolean;
}

interface FormValues {
  text: string;
  assignee: string;
  difficulty: number;
}

const Todo: React.FC = () => {
  const [defaultValues] = useState<FormValues>({
    difficulty: 4,
    text: '',
    assignee: ''
  });
  const [list, setList] = useState<Item[]>([]);
  const [incomplete, setIncomplete] = useState<number>(0);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item: FormValues) {
    const newItem: Item = {
      ...item,
      id: uuid(),
      complete: false
    };
    setList([...list, newItem]);
  }

  function deleteItem(id: string) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id: string) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  useEffect(() => {
    const incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <>
      <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      {list.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}
    </>
  );
};

export default Todo;


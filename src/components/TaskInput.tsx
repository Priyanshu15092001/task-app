// Form to add new tasks
import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskInput: FC = () => {
  const [text, setText] = useState('');
  const { dispatch } = useTasks();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't add empty tasks

    // Dispatch the ADD_TASK action with the input text
    dispatch({ type: 'ADD_TASK', payload: text });
    setText(''); // Reset input
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '8px', fontSize: '16px', width: '250px', marginRight: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 16px', fontSize: '16px' }}>
        Add Task
      </button>
    </form>
  );
};
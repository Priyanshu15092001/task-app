// List of tasks with toggle/delete actions
import type { FC } from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskList: FC = () => {
  const { tasks, dispatch } = useTasks();

  if (tasks.length === 0) {
    return <p>No tasks left! Enjoy your day 🎉</p>;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            margin: '4px 0',
            background: '#f4f4f4',
            borderRadius: '4px',
            width: '350px',
          }}
        >
          <span
            onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              flexGrow: 1,
              color: task.completed ? '#888' : '#000',
            }}
          >
            {task.text}
          </span>
          <button
            onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
            style={{ background: '#ff4d4d', color: '#white', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
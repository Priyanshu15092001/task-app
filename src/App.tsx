import type { FC } from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';

export const App: FC = () => {
  return (
    <TaskProvider>
      <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <h2>Task Tracker (useContext + useReducer)</h2>
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
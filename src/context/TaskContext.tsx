//Creates context and provider wrapper

import { createContext, useContext, useReducer } from 'react';
import type { ReactNode, FC } from 'react';
import type { TaskContextType } from './types';
import { taskReducer, initialTasks } from './taskReducer';

// 1. Create the context with an initial undefined value
const TaskContext= createContext<TaskContextType | undefined>(undefined);

// 2. Define props for the Provider component
interface TaskProviderProps{
    children: ReactNode;
}

// 3. Create the provider component
export const TaskProvider: FC<TaskProviderProps>=({children})=>{
    // Initialize useReducer with our taskReducer and initialTasks
    const [tasks,dispatch]=useReducer(taskReducer,initialTasks);

    return (
        <TaskContext.Provider value={{tasks, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

// 4. Create a custom hook for easy contex consumption
export const useTasks = ():TaskContextType=>{
    const context=useContext(TaskContext);
    if(!context){
        throw new Error('useTasks must be used within a TaskProvider')
    }
    return context;
}
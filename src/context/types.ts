// Typescripts interfaces and types
import type { Dispatch } from 'react';

// 1. Single task interface
export interface Task{
    id:number;
    text:string;
    completed:boolean;
}

// 2. Action union types for reducer
export type TaskAction=
| {type:'ADD_TASK'; payload:string}
| {type:'TOGGLE_TASK'; payload:number}
| {type:'DELETE_TASK';payload:number};

// 3. Context value interface
export interface TaskContextType{
    tasks:Task[];
    dispatch:Dispatch<TaskAction>;
}
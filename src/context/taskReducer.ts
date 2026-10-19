// Reducer function handling state transitions

import type { Task, TaskAction } from './types';

// Initial state for our todo list
export const initialTasks: Task[]=[
    {id:1,text:'Learn useReducer',completed:true},
    {id:2,text:'Combine with useContext',completed:false},
];

export const taskReducer=(state:Task[],action:TaskAction):Task[]=>{
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask:Task={id: Date.now(),
            text: action.payload,
            completed: false,
            };
            return [...state,newTask];
        }
        
        case 'TOGGLE_TASK':
            return state.map((task)=>
            task.id===action.payload
            ? {...task,completed: !task.completed}:task)

        case 'DELETE_TASK':
            return state.filter((task)=>task.id!==action.payload);
        
        default:
            return state;
    }
}
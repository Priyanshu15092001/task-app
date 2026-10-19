# Task App — Learn `useReducer` + `useContext` Together

A tiny Task Tracker built with **React 19 + TypeScript + Vite** to learn how `useReducer` (predictable state transitions) and `useContext` (prop-drilling-free sharing) work together.

> Learning focus: `dispatch(action) -> reducer(state, action) -> new state -> re-render`.

## Features

- Add a task (`ADD_TASK`)
- Toggle complete by clicking text (`TOGGLE_TASK`)
- Delete a task (`DELETE_TASK`)
- Empty-state message when no tasks
- Fully typed `TaskAction` discriminated union
- `useTasks()` hook with provider guard

## Stack

- `react@^19.2.8`, `react-dom@^19.2.8`
- `typescript@~6.0.2` (`verbatimModuleSyntax`, `jsx: react-jsx`, `noUnusedLocals`)
- `vite@^8.3.0` + `@vitejs/plugin-react`
- Lint: `oxlint`

```bash
npm run dev      # vite dev + HMR
npm run build    # tsc -b && vite build
npm run lint     # oxlint
npm run preview  # vite preview
```

## Project Structure

```
task-app/
  index.html
  vite.config.ts
  src/
    main.tsx
    App.tsx
    index.css
    context/types.ts
    context/taskReducer.ts
    context/TaskContext.tsx
    components/TaskInput.tsx
    components/TaskList.tsx
```

## Flow — How It Works

```
main.tsx
  └─ <App/>
       └─ <TaskProvider>  // [tasks, dispatch] = useReducer(taskReducer, initialTasks)
            ├─ <TaskInput/>  // dispatch ADD_TASK
            └─ <TaskList/>   // dispatch TOGGLE_TASK / DELETE_TASK
```

1. User submits form in `TaskInput` -> `dispatch({ type:'ADD_TASK', payload: text })`.
2. React calls `taskReducer(prevState, action)`.
3. Reducer returns new array (never mutates).
4. Provider re-renders with new `tasks` value.
5. All `useTasks()` consumers re-render. No prop drilling.

`useReducer` = how state changes. `useContext` = how state is shared.

## File-by-File Usage

### `src/main.tsx`
Entry. Mounts `<App/>` in `StrictMode` on `#root` from `index.html`.

### `src/App.tsx`
Composes UI inside provider so children can use `useTasks()`:
`TaskProvider > div > h2 + TaskInput + TaskList`.

### `src/context/types.ts`
Type source of truth:
- `Task { id:number; text:string; completed:boolean }`
- `TaskAction` union: `ADD_TASK:string`, `TOGGLE_TASK:number`, `DELETE_TASK:number`
- `TaskContextType { tasks:Task[]; dispatch:Dispatch<TaskAction> }`
Narrowing means `payload` type follows `type`. Typo `TOOGLE_TASK` breaks both reducer and dispatch.

### `src/context/taskReducer.ts`
Pure `(state, action) => newState` plus `initialTasks` (2 demo tasks).
- `ADD_TASK`: `[...state, { id:Date.now(), text:payload, completed:false }]`
- `TOGGLE_TASK`: `map` + flip `completed`
- `DELETE_TASK`: `filter` by id
`ADD_TASK` uses `{}` block to scope `const newTask`.

### `src/context/TaskContext.tsx`
- `createContext<TaskContextType|undefined>(undefined)` for fast fail on misuse.
- `TaskProvider`: `useReducer(taskReducer, initialTasks)`, provides `{tasks, dispatch}`.

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run lint
```

## What I Learned

1. Reducer must be pure + immutable.
2. Union gives free narrowing of `payload`.
3. Context `{tasks, dispatch}` avoids prop drilling.
4. Hook guard prevents silent undefined bugs.
5. `Date.now()` ok for demo ids, use `crypto.randomUUID()` in real apps.

## Next Ideas

- Edit task, filter All/Active/Done, persist to localStorage, unit-test reducer.

## Troubleshooting

- `TS2678/TS2322 TOGGLE_TASK` -> fixed `TOOGLE_TASK` typo in types.ts.
- `Cannot find React` -> use `import type { Dispatch }`.
- `TS6133 React unused` -> `jsx:react-jsx` needs no default import, use `import type { FC }`.
- `verbatimModuleSyntax` -> use `import type` for types.

- `useTasks()`: wraps `useContext`, throws if outside provider.

### `src/components/TaskInput.tsx`
Local `useState(text)` + global dispatch. `trim()` check ignores empty. Dispatches `ADD_TASK`, then clears.

### `src/components/TaskList.tsx`
Reads `tasks` via `useTasks()`. Empty-state message if none. `span onClick` dispatches `TOGGLE_TASK` (line-through when done). Button dispatches `DELETE_TASK`.



import React, {useState} from 'react';
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from "react-redux";

type Generation = {
    generation: string
}

type Counter = {
    count: number
}

type Task = {
    id: number;
    title: string;
    body?: string;
}
type Tasks = {
    tasks: Task[];
    nextId: number;
}

const initialState: Generation = {
    generation: "First"
}

const counterInitialState: Counter = {
    count: 0
}

const tasksInitialState: Tasks = {
    tasks: [],
    nextId: 0
}

export const generationSlice = createSlice({
    name: 'generation',
    initialState,
    reducers: {
        changeGeneration: (state, action) => {
            state.generation = action.payload
        },
    }
})

export const counterSlice = createSlice({
    name: 'counter',
    initialState: counterInitialState,
    reducers: {
        countUp: (state) => {
            state.count = state.count + 1
        }
    }
})

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        addTask: (state, action: PayloadAction<{title: string, body?: string}>) => {

            state.tasks.push({
                id: state.nextId,
                ...action.payload
            })
            state.nextId++
        },
        deleteTask: (state, action: PayloadAction<{taskId: number}>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload.taskId);
        }
    }
})

const {changeGeneration} = generationSlice.actions;
const {countUp} = counterSlice.actions;
const {addTask, deleteTask} = tasksSlice.actions;


export const store = configureStore({
    reducer: {
        generationReducer: generationSlice.reducer,
        counterReducer: counterSlice.reducer,
        tasksReducer: tasksSlice.reducer,
    }
})

export type AppRootState = ReturnType<typeof store.getState>;

export const selectGeneration = (state: AppRootState) => state.generationReducer.generation;
export const selectCounter = (state: AppRootState) => state.counterReducer.count;
export const selectTasks = (state: AppRootState) => state.tasksReducer.tasks;
export const selectNextId = (state: AppRootState) => state.tasksReducer.nextId;

const App: React.FC = () => {
    const generation = useSelector(selectGeneration);
    const counter = useSelector(selectCounter);
    const tasks = useSelector(selectTasks);
    const nextId = useSelector(selectNextId);

    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const createTask = () => {
        dispatch(addTask({title, body }))
        setTitle('')
        setBody('')
    }
    return (
        <div>
            <div>
                {generation}
                <button type="button" onClick={() => dispatch(changeGeneration("First"))}>
                    First Generation
                </button>
                <button type="button" onClick={() => dispatch(changeGeneration("second"))}>
                    Second Generation
                </button>
            </div>
            <div>
                {counter}
                <button type="button" onClick={() => dispatch(countUp())}>
                    Count Up
                </button>
            </div>

            <div>
                <h2>タスク一覧</h2>
            </div>
            <div>
                {tasks.map((e) => (<>
                    <div>{e.title}, {e.body} <button onClick={()=> dispatch(deleteTask({taskId: e.id}))}>削除</button></div>
                </>))}
            </div>
            <div>
                <div>
                    <h3>タスク作成</h3>
                </div>
                <div>
                    id: {nextId}
                </div>
                <div>
                    title:
                    <input type="text" onChange={(e)=> setTitle(e.target.value)} value={title} />
                </div>
                <div>
                    body:
                    <input type="text" onChange={(e) => setBody(e.target.value)} value={body} />
                </div>
                <button onClick={() => createTask() } >追加</button>
            </div>
        </div>
    );
}

export default App;

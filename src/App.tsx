import React from 'react';
import {configureStore, createSlice} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from "react-redux";

type Generation = {
    generation: string
}

type Counter = {
    count: number
}
const initialState: Generation = {
    generation: "First"
}

const counterInitialState: Counter = {
    count: 0
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

const {changeGeneration} = generationSlice.actions;
const {countUp} = counterSlice.actions;


export const store = configureStore({
    reducer: {
        generationReducer: generationSlice.reducer,
        counterReducer: counterSlice.reducer,
    }
})

export type AppRootState = ReturnType<typeof store.getState>;

export const selectGeneration = (state: AppRootState) => state.generationReducer.generation;
export const selectCounter = (state: AppRootState) => state.counterReducer.count;

const App: React.FC = () => {
    const generation = useSelector(selectGeneration);
    const counter = useSelector(selectCounter);

    const dispatch = useDispatch();

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
        </div>
    );
}

export default App;

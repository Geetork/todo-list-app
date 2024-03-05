import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './tasksSlice';

export const store = configureStore({
    reducer: {
        todos: taskReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITask {
    id: string,
    state: 'done' | 'pending',
    taskText: string,
};

export interface ITaskList {
    items: ITask[],
    currentTask: null | ITask,
};

const initialState: ITaskList = {
    items: [{
            id: '123',
            state: 'pending',
            taskText: 'To do a 10 minutes workout'
        },
        {
            id: '234',
            state: 'pending',
            taskText: 'To checkout a word of the day'
        },
        {
            id: '345',
            state: 'done',
            taskText: 'To read 10 pages of a book'
        }
    ],
    currentTask: null
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.items.push(action.payload)
        },
        deleteTask: (state, action: PayloadAction<ITask>) => {
            const { id } = action.payload;
            state.items = state.items.filter(task => task.id !== id);
        },
        changeTaskState: (state, action: PayloadAction<ITask>) => {
            const { id } = action.payload;
            const existingTask = state.items.find(task => task.id === id);

            if (existingTask) {
                state.items = state.items.map(task => 
                    task.id === id ? { ...task, state: task.state === 'pending' ? 'done' : 'pending' } : task);
            }
        },
        setCurrentTask: (state, action: PayloadAction<null | ITask>) => {
            state.currentTask = action.payload;
        },
        updateTask: (state, action: PayloadAction<ITask>) => {
            const { id, taskText } = action.payload;
            const existingTask = state.items.find(task => task.id === id);

            if (existingTask) {
                state.items = state.items.map(task => 
                    task.id === id ? { ...task, taskText } : task);
            }
        },
        moveTask: (state, action: PayloadAction<{prevId: string, currentId: string}>) => {
            const { prevId, currentId } = action.payload;
            const itemsCopy = [...state.items];

            const currentIndex = state.items.findIndex(task => task.id === currentId);
            const prevIndex = state.items.findIndex(task => task.id === prevId);

            if (currentIndex !== -1 && prevIndex !== -1) {
                const [movedTask] = itemsCopy.splice(prevIndex, 1);
                itemsCopy.splice(currentIndex, 0, movedTask);
                state.items = itemsCopy;
            }
        },
        updateTaskListFromStorage: (state, action: PayloadAction<ITask[]>) => {
            state.items = action.payload;
        },
    },
});

export const actions = tasksSlice.actions;
export default tasksSlice.reducer; 
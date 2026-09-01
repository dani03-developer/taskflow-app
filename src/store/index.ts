import { configureStore } from "@reduxjs/toolkit";
import pomodoroReducer from '../features/pomodoro/PomodoroSlice';
import streakReducer from '../features/streak/streakSlice';
import tasksReducer from '../features/tasks/TasksSlice';
export const store = configureStore({
    reducer:{
        tasks:tasksReducer,
        pomodoro: pomodoroReducer,
        streak: streakReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
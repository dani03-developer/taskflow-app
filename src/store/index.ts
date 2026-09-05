import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/auth/AuthSlice';
import pomodoroReducer from '../features/pomodoro/PomodoroSlice';
import profileReducer from '../features/porfile/profileSlice';
import streakReducer from '../features/streak/streakSlice';
import tasksReducer from '../features/tasks/TasksSlice';
export const store = configureStore({
    reducer:{
        tasks:tasksReducer,
        pomodoro: pomodoroReducer,
        streak: streakReducer,
        auth: AuthReducer,
        profile:profileReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
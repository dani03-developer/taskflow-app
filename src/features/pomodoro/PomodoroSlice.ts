import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type PomodoroState = {
    time: number               // duración de cada pomodoro, en minutos   
    minutosTotales: number    
}

const initialState: PomodoroState = {
    time: 10,  // 10 min por defecto
    minutosTotales: 0
}
const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        changeTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload;
        },
        completarPomodoro: (state, action: PayloadAction<number>) => {
            state.minutosTotales += action.payload   
        },
        setPomodoro: (state, action: PayloadAction<{ minutosTotales: number }>) => {
            state.minutosTotales = action.payload.minutosTotales   // reemplaza
        },
        resetPomodoro: (state) => {
            state.minutosTotales= 0
        }
    }
})
export const { setPomodoro, changeTime, completarPomodoro, resetPomodoro } = pomodoroSlice.actions
export default pomodoroSlice.reducer
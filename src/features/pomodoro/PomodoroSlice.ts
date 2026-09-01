import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type PomodoroState = {
    time: number               // duración de cada pomodoro, en minutos
    completados: number       // cuántos terminó (para el perfil)
    minutosTotales: number     // duración de cada pomodoro, en segundos
}

const initialState: PomodoroState = {
    time: 10,  // 10 min por defecto
    completados: 0,
    minutosTotales: 0  
}
const pomodoroSlice =  createSlice({
    name:'pomodoro',
    initialState,
    reducers:{
        changeTime:(state,action:PayloadAction<number>)=>{
            state.time=action.payload;
        },
        completarPomodoro:(state,action:PayloadAction<number>)=>{
            state.completados += 1;
            state.minutosTotales +=action.payload; 
        }
    }
})
export const {completarPomodoro, changeTime}=pomodoroSlice.actions
export default pomodoroSlice.reducer
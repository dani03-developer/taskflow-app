import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type PomodoroState = {
    completados: number       // cuántos terminó (para el perfil)
    minutosTotales: number     // duración de cada pomodoro, en segundos
}

const initialState: PomodoroState = {
    completados: 0,
    minutosTotales: 0  // 25 min por defecto
}
const pomodoroSlice =  createSlice({
    name:'pomodoro',
    initialState,
    reducers:{
        completarPomodoro:(state,action:PayloadAction<number>)=>{
            state.completados += 1;
            state.minutosTotales +=action.payload; 
        }
    }
})
export const {completarPomodoro}=pomodoroSlice.actions
export default pomodoroSlice.reducer
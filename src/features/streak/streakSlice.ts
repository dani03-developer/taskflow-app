import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTodayString } from '../tasks/TasksSlice'
type streakState = {
    contador: number
    ultimaFecha: string | null
}

const initialState: streakState = {
    contador: 0,
    ultimaFecha: null
}
const getyesterdayString = () => {
    const d = new Date()
    d.setDate(d.getDate() - 1)   // retroceder un día (como en el WeekCalendar)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const streakSlice = createSlice({
    name: 'streak',
    initialState,
    reducers: {
        setStreak: (state, action: PayloadAction<{ contador: number; ultimaFecha: string | null }>) => {
            state.contador = action.payload.contador;
            state.ultimaFecha = action.payload.ultimaFecha;
        },
        updateStreak: (state) => {
            const today = getTodayString()
            const yesterday = getyesterdayString()

            if (state.ultimaFecha === today) {
                return   //se sale de la función
            }

            if (state.ultimaFecha === yesterday) {
                state.contador += 1
            } else {
                state.contador = 1        //sino se corta la racha
            }

            state.ultimaFecha = today        // actualiza la fecha 
        },
        resetStreak: (state) => {
            state.contador = 0
            state.ultimaFecha = null
        }
    }
})
export const { setStreak, updateStreak, resetStreak } = streakSlice.actions
export default streakSlice.reducer
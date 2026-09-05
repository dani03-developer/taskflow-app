import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { userProfile } from '../../types'
type ProfileState={
    profile: userProfile | null
}
const initialState: ProfileState = {
    profile: null,
}
const profileSlice =  createSlice({
    name:'porfile',
    initialState,
    reducers:{
         setProfile: (state, action: PayloadAction<userProfile | null>) => {
            state.profile = action.payload
        },
        clearProfile: (state) => {
            state.profile = null   
        },
    }
})
export const {setProfile, clearProfile}=profileSlice.actions
export default profileSlice.reducer
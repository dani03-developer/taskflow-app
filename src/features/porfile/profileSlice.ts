import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { userProfile } from '../../types'
type ProfileState = {
    profile: userProfile | null
}
const initialState: ProfileState = {
    profile: null,
}
const profileSlice = createSlice({
    name: 'porfile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<userProfile | null>) => {
            state.profile = action.payload
        },
        clearProfile: (state) => {
            state.profile = null
        },
        setUserPhoto: (
            state,
            action: PayloadAction<string | null>
        ) => {
            if (state.profile) {
                state.profile.photoURL = action.payload
            }
        },
    }
})
export const { setProfile, clearProfile, setUserPhoto } = profileSlice.actions
export const selectUserPhoto = (state: {
    auth: ProfileState
}) => state.auth.profile?.photoURL ?? null
export default profileSlice.reducer
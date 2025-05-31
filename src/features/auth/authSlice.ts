import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/IApiTypes'

export interface authState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: IUser,
    accessToken?: string,
}

const initialState: authState = {
}

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | undefined>) => {
            state.user = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string | undefined>) => {
            state.accessToken = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setAccessToken } = userSlice.actions

export default userSlice.reducer
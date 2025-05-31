import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LayoutState {
    isLoading: boolean,
    isMobile: boolean,
    isSidebarOpen: boolean,
}

const initialState: LayoutState = {
    isLoading: false,
    isMobile: false,
    isSidebarOpen: false,
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLoader: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        },
        setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isSidebarOpen = action.payload;
        },
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoader, setMobile, setIsSidebarOpen, toggleSidebar } = layoutSlice.actions

export default layoutSlice.reducer
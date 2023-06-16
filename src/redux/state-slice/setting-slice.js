import { createSlice } from '@reduxjs/toolkit'

export const settingSlice = createSlice({
    name: "setting",
    initialState: {
        Loader: "d-none"
    },
    reducers: {
        ShowLoader: (state) => {
            state.Loader = ""
        },

        HideLoader: (state) => {
            state.Loader = "d-none"
        }
    }
})

export const { ShowLoader, HideLoader } = settingSlice.actions
export default settingSlice.reducer;
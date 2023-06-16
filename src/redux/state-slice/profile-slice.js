import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        RegistrationFormValue: {
            name: "",
            phone: "",
            email: "",
            password: ""
        },

        LoginFormValue: {
            email: "",
            password: ""
        }
    },
    reducers: {
        SetRegistrationFormValue: (state, action) => {
            state.RegistrationFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        RemoveRegistrationFormValue: (state) => {
            Object.keys(state.RegistrationFormValue).forEach((i) => state.RegistrationFormValue[i] = "")
        },

        SetLoginFormValue: (state, action) => {
            state.LoginFormValue[`${action.payload.Name}`] = action.payload.Value
        },

        RemoveLoginFormValue: (state) => {
            Object.keys(state.LoginFormValue).forEach((i) => state.LoginFormValue[i] = "")
        }
    }
})

export const { SetRegistrationFormValue, RemoveRegistrationFormValue, SetLoginFormValue, RemoveLoginFormValue } = profileSlice.actions
export default profileSlice.reducer;
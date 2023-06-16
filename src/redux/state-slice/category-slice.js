import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        CategoryList: [],
        TotalCategory: 0,
        CategoryFormValue: {
            name: "",
            id: ""
        }
    },
    reducers: {
        SetCategoryList: (state, action) => {
            state.CategoryList = action.payload
        },

        SetTotalCategory: (state, action) => {
            state.TotalCategory = action.payload
        },

        SetCategoryFormValue: (state, action) => {
            state.CategoryFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        ResetCategoryFormValue: (state) => {
            Object.keys(state.CategoryFormValue).forEach((i) => state.CategoryFormValue[i] = "")
        }
    }
})

export const { SetCategoryList, SetTotalCategory, SetCategoryFormValue, ResetCategoryFormValue } = categorySlice.actions
export default categorySlice.reducer;
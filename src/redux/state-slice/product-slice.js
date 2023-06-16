import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: "product",
    initialState: {
        CategoryDropDown: [],
        ProductList: [],
        ProductFormValue: {
            title: "",
            description: "",
            price: "",
            quantity: "",
            category: "",
            image: "",
            categoryId: "",
            contentType: "",
            imagePreview: "",
            id: ""
        },
        TotalProduct: 0
    },
    reducers: {
        SetCategoryDropDown: (state, action) => {
            state.CategoryDropDown = action.payload
        },

        SetProductList: (state, action) => {
            state.ProductList = action.payload
        },

        SetProductFormValue: (state, action) => {
            state.ProductFormValue[`${action.payload.Name}`] = action.payload.Value;
        },

        SetTotalProduct: (state, action) => {
            state.TotalProduct = action.payload;
        },

        ResetProductFormValue: (state) => {
            Object.keys(state.ProductFormValue).forEach((i) => state.ProductFormValue[i] = "")
        }
    }
})

export const { SetCategoryDropDown, SetProductList, SetProductFormValue, SetTotalProduct, ResetProductFormValue } = productSlice.actions
export default productSlice.reducer
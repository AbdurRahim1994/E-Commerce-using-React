import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        CartList: [],
        TotalCart: 0
    },
    reducers: {
        SetCartList: (state, action) => {
            localStorage.setItem("cartItem", JSON.stringify([...state.CartList, action.payload]))
            state.CartList = JSON.parse(localStorage.getItem("cartItem"))
        },

        SetTotalCart: (state, action) => {
            state.TotalCart = action.payload
        }
    }
})

export const { SetCartList, SetTotalCart } = cartSlice.actions
export default cartSlice.reducer
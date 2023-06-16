import { configureStore } from '@reduxjs/toolkit'
import settingReducer from '../state-slice/setting-slice'
import profileReducer from '../state-slice/profile-slice'
import productReducer from '../state-slice/product-slice'
import categoryReducer from '../state-slice/category-slice'
import cartReducer from '../state-slice/cart-slice'

export default configureStore({
    reducer: {
        setting: settingReducer,
        profile: profileReducer,
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer
    }
})
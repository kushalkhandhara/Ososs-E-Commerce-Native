const {configureStore} = require("@reduxjs/toolkit");

import ProductReducer from './slices/ProductsSlice.js'
import CartReducer from './slices/CartSlice.js'

export const store = configureStore({
    reducer : {
        product : ProductReducer, 
        cart : CartReducer, 
    }
})
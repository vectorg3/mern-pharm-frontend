import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import shopReducer from "./slices/shop";

const store = configureStore({
    reducer:{
        auth: authReducer,
        shop: shopReducer,
    }
})

export default store;
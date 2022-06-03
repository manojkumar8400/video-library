import { configureStore } from "@reduxjs/toolkit";
import operatorReducer from "./operatorSlice";

export const store = configureStore({
    reducer:{
        operator: operatorReducer,
    }
})
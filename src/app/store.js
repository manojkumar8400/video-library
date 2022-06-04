import { configureStore } from "@reduxjs/toolkit";
import operatorReducer from "./slice/operatorSlice";
import dataReducer from "./slice/dataSlice"
export const store = configureStore({
    reducer:{
        operator: operatorReducer,
        data: dataReducer
    }
})
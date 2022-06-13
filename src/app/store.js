import { configureStore } from "@reduxjs/toolkit";
import operatorReducer from "./slice/operatorSlice";
import dataReducer from "./slice/dataSlice";
import authReducer from "./slice/authSlice";
import featuresReducer from "./slice/featureSlice";
import playListreducer from "./slice/playListSlice";


export const store = configureStore({
    reducer:{
        operator: operatorReducer,
        data: dataReducer,
        auth: authReducer,
        features: featuresReducer,
        playList: playListreducer
    }
})
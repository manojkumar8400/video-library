import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: true,
    auth: {
        authToken: localStorage.getItem("authToken") || null,
        user: localStorage.getItem("user") || null
    },
    loginStatus: true,
}

export const loginGuest = createAsyncThunk("auth/loginGuest", async () => {
    try {
        const res = await axios.post("/api/auth/login", {
            email: "manojkumar@gmail.com",
            password: "manoj@123",
        });
        return res;
    } catch (error) {
        console.log(error.message);
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginHandler: (state, { payload }) => {
            state.loginStatus = true;
            // localStorage.setItem("loginStatus",true)
        },

        logoutHandler: (state, { payload }) => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            state.loginStatus = false
        }
    },
    extraReducers: {
        [loginGuest.pending]: (state) => {
            state.status = true;
        },
        [loginGuest.fulfilled]: (state, { payload }) => {
            state.status = false;
            localStorage.setItem("authToken", payload.data.encodedToken);
            localStorage.setItem("user", payload.data.foundUser.firstName);
            state.auth.authToken = payload.data.encodedToken;
            state.auth.user = payload.data.foundUser.firstName;
        },
        [loginGuest.rejected]: (state) => {
            state.status = false;
        }
    }
})

export const { loginHandler, logoutHandler } = authSlice.actions

export default authSlice.reducer;
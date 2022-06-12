import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    status: true,
    authToken: localStorage.getItem("authToken") || null,
    user: localStorage.getItem("user") || null,
    loginStatus: false,
}

export const loginGuest = createAsyncThunk("auth/loginGuest", async () => {
    try {
        const res = await axios.post("/api/auth/login", {
            email: "manojkumar@gmail.com",
            password: "manoj@123",
        });
        localStorage.setItem("authToken", res.data.encodedToken);
        localStorage.setItem("user", res.data.foundUser.firstName);
        localStorage.setItem("loginStatus", true);
        return res;
    } catch (error) {
        console.log(error.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutHandler: (state, { payload }) => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            state.loginStatus = false;
            localStorage.setItem("loginStatus", false);
            toast.info("Successfully logout")
        }
    },

    extraReducers: {
        [loginGuest.pending]: (state) => {
            state.status = true;
        },
        [loginGuest.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.authToken = payload.data.encodedToken;
            state.user = payload.data.foundUser.firstName;
            state.loginStatus = localStorage.getItem("loginStatus");
            toast.success(`Welcome back ${state.user}`)
        },
        [loginGuest.rejected]: (state) => {
            state.status = false;
        }
    }
})

export const { logoutHandler } = authSlice.actions

export default authSlice.reducer;
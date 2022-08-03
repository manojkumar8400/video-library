import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const postLogin = createAsyncThunk("auth/postLogin",
    async ({ email, password }) => {
        try {
            const { data } = await axios.post("/api/auth/login", { email, password });
            localStorage.setItem("authToken", data.encodedToken);
            localStorage.setItem("user", data.foundUser.firstName);
            localStorage.setItem("status", true);
            toast.success(`Welcome back ${data.foundUser.firstName}`);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    })

export const postSignup = createAsyncThunk("auth/postSignup",
    async ({ firstname, lastname, email, password }) => {
        try {
            const { data } = await axios.post('/api/auth/signup', {
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password
            });
            toast.success(`Welcome ${data.createdUser.firstName}`);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    })

const initialState = {
    status: localStorage.getItem("status"),
    authToken: localStorage.getItem("authToken") || null,
    user: localStorage.getItem("user") || null,
    lName: "" || "kumar",
    mail: "" || "manojkumar@gmail.com"
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutHandler: (state) => {
            state.authToken = localStorage.removeItem("authToken");
            state.user = localStorage.removeItem("user");
            localStorage.removeItem("status", false);
            state.status = false;
            toast.info("Successfully logged out")
        }
    },

    extraReducers: {
        [postLogin.pending]: (state) => {
            state.status = true;
        },
        [postLogin.fulfilled]: (state, { payload }) => {
            state.authToken = payload.encodedToken;
            state.user = payload.foundUser.firstName;
            state.lname = payload.foundUser.lastName;
            state.mail = payload.foundUser.email;
        },
        [postLogin.rejected]: (state) => {
            state.status = false;
            toast.error("Invalid Username or Password");
        },

        [postSignup.pending]: (state) => {
            state.status = true;
        },
        [postSignup.fulfilled]: (state, {payload}) => {
            state.authToken = payload.encodedToken;
            state.user = payload.createdUser.firstName;
            state.lname = payload.createdUser.lastName;
            state.mail = payload.createdUser.email;
        },
        [postSignup.rejected]: (state) => {
            state.status = false;
            toast.error("Invalid Email or Password");
        }
    }
})

export const { logoutHandler } = authSlice.actions

export default authSlice.reducer;
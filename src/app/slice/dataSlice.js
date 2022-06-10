import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: true,
    videos: [],
    cat: []
}

export const fetchData = createAsyncThunk("data/fetchData", async () => {
    try {
        const res = await axios.get("/api/videos")
        const data = res.data.videos;
        return data
    } catch {
        const data = "Opps there seems to be an error";
        console.log(data)
    }
})


const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchData.pending]: (state) => {
            state.status = true;
        },
        [fetchData.fulfilled]: (state, { payload }) => {
            state.videos = payload;
            state.status = false;
        },
        [fetchData.rejected]: (state) => {
            state.status = false;
        },
    }
})

export default dataSlice.reducer;
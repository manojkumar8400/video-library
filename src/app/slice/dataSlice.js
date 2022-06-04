import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: true,
    videos: []
}

export const fetchData = createAsyncThunk("data/fetchData", async () => {
    try{
        const res = await axios.get("api/videos")
        const data = res.data.videos;
        return data
    } catch {
        const data = "Opps there seems to be an error";
        return data
    }
})

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers:{},
    extraReducers: {
        [fetchData.pending]: (state) => {
            state.status = true;
        },
        [fetchData.fulfilled]: (state, action) => {
            state.videos = action.payload;
            state.status = false;
        },
        [fetchData.rejected]: (state) =>{
            state.status = false;
        }
    }
})

export default dataSlice.reducer
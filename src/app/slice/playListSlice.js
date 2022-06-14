import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const postNewPlaylist = createAsyncThunk("playlist/playlistPost", async (title) => {
    try {
        const { data } = await axios.post("/api/user/playlists", {
            playlist: title
        },
            {
                headers: {
                    authorization: localStorage.getItem("authToken")
                }
            }
        );
        toast.success("New playlist Has created");
    } catch (error) {
        console.log(error);
    }
})


export const getPlayLists = createAsyncThunk("playlist/getPlayList", async () => {
    try {
        const res = await axios({
            url: "/api/user/playlists",
            method: "GET",
            headers: {
                authorization: localStorage.getItem("authToken")
            },
        })
        const data = res.data.playlists;
        return data;
    } catch (error) {
        console.log(error);
    }

})


export const deletePlayList = createAsyncThunk("playlist/deletePlayList", async (playListId) => {
    try {
        const res = await axios({
            url: `/api/user/playlists/${playListId}`,
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem("authToken")
            },
        })
        const data = res.data.playlists;
        toast.success("playlist delete successfully")
        return data;
    } catch (error) {
        console.log(error);
    }

})


export const PostVideo = createAsyncThunk("playlist/PostVideo", async ({ playListId, video }) => {
    try {
        const { data } = await axios.post(`/api/user/playlists/${playListId}`, {
            video: video
        },
            {
                headers: {
                    authorization: localStorage.getItem("authToken")
                }
            }
        );
        toast.success("Video added in playlist");
    } catch (error) {
        console.log(error);
    }
})


export const deleteVideo = createAsyncThunk("playlist/deleteVideo", async ({ playListVideoId, videoId }) => {
    try {
        const { data } = await axios({
            url: `/api/user/playlists/${playListVideoId}/${videoId}`,
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem("authToken")
            },
        })
        toast.success("Video delete successfully")
        return data;
    } catch (error) {
        console.log(error);
    }
})



const initialState = {
    status: true,
    playLists: []
}

const playListSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},

    extraReducers: {

        //   Get Playlists

        [getPlayLists.pending]: (state) => {
            state.status = true;
        },
        [getPlayLists.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.playLists = payload;
        },
        [getPlayLists.rejected]: (state) => {
            state.status = false;
        },

        //      Delete Playlist

        [deletePlayList.pending]: (state) => {
            state.status = true;
        },
        [deletePlayList.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.playLists = payload;
        },
        [deletePlayList.rejected]: (state) => {
            state.status = false;
        },

    }
})

export default playListSlice.reducer
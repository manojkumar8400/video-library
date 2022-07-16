import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const likePost = createAsyncThunk("features/likePost", async (video) => {
    try {
        const res = await axios.post("/api/user/likes", {
            video: video
        },
            {
                headers: {
                    "authorization": localStorage.getItem("authToken")
                }
            });
        toast.success("Added to Like")
        const data = res.data.likes;
        return data;
    } catch (error) {
        console.log(error);
        toast.error("Please login first");
    }
});


export const likeGet = createAsyncThunk("features/likeGet", async () => {
    try {
        const res = await axios({
            url: "/api/user/likes",
            method: "GET",
            headers: {
                authorization: localStorage.getItem("authToken")
            },
        })
        const data = res.data.likes;
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const likeRemove = createAsyncThunk("features/likeremove", async (videoId) => {
    try {
        const res = await axios({
            url: `/api/user/likes/${videoId}`,
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem("authToken")
            }
        })
        const data = res.data.likes;
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const watchLaterPost = createAsyncThunk("features/watchLaterPost", async (video) => {
    try {
        const res = await axios.post("/api/user/watchlater", {
            video: video
        },
            {
                headers: {
                    "authorization": localStorage.getItem("authToken")
                }
            });
        toast.success("Added to Watchlater");
        const data = res.data.watchlater;
        return data;
    } catch (error) {
        console.log(error);
        toast.error("Please login first");
    }
});

export const watchLaterGet = createAsyncThunk("features/watchLaterGet", async () => {
    try {
        const res = await axios({
            url: "/api/user/watchlater",
            method: "GET",
            headers: {
                authorization: localStorage.getItem("authToken")
            },
        })
        const data = res.data.watchlater;
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const watchlaterRemove = createAsyncThunk("features/watchlaterRemove", async (videoId) => {
    try {
        const res = await axios({
            url: `/api/user/watchlater/${videoId}`,
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem("authToken")
            }
        })
        const data = res.data.watchlater;
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const historyPost = createAsyncThunk("features/historyPost", async (video) => {
    try {
        const res = await axios.post("/api/user/history", {
            video: video
        },
            {
                headers: {
                    "authorization": localStorage.getItem("authToken")
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
});

export const historyGet = createAsyncThunk("features/historyGet", async () => {
    try {
        const res = await axios({
            url: "/api/user/history",
            method: "GET",
            headers: {
                authorization: localStorage.getItem("authToken")
            }
        })
        const data = res.data.history;
        return data
    } catch (error) {
        console.log(error);
    }
});

export const historyRemove = createAsyncThunk("features/historyRemove", async (videoId) => {
    try {
        const res = await axios({
            url: `/api/user/history/${videoId}`,
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem("authToken")
            }
        })
        const data = res.data.history;
        return data
    } catch (error) {
        console.log(error);
    }
});

export const historyRemoveAll = createAsyncThunk("features/historyRemoveAll", async () => {
    try {
        const res = await axios({
            url: "/api/user/history/all",
            method: "DELETE",
            headers: {
                authorization: localStorage.getItem("authToken")
            }
        })
        toast.success("All items are removed");
        const data = res.data.history;
        return data
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    status: true,
    checkGener: "",
    getLikeData: [],
    watchlaterData: [],
    historyData: [],
    filterValue: "All",
    searchValue: ""
}

const featureSlice = createSlice({
    name: "features",
    initialState,
    reducers: {
        filterCat: (state, { payload }) => {
            state.filterValue = payload;
        },

        searchItem: (state, { payload }) => {
            state.searchValue = payload;
        }
    },

    extraReducers: {

        //      Like Post  Request
        [likePost.pending]: (state) => {
            state.status = true;
        },
        [likePost.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.getLikeData = payload;
        },
        [likePost.rejected]: (state) => {
            state.status = false
        },


        //      Like Get Request

        [likeGet.pending]: (state) => {
            state.status = true;
        },
        [likeGet.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.getLikeData = payload;
        },
        [likePost.rejected]: (state) => {
            state.status = false;
        },


        //      Like Remove Request

        [likeRemove.pending]: (state) => {
            state.status = true
        },
        [likeRemove.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.getLikeData = payload;
            toast.success("Remove from Like");
        },
        [likePost.rejected]: (state) => {
            state.status = false
            toast.error("Request Reject ", {
                position: "top-right"
            });
        },

        //      Watchlater Post Request

        [watchLaterPost.pending]: (state) => {
            state.status = true;
        },
        [watchLaterPost.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.watchlaterData = payload;
        },
        [watchLaterPost.rejected]: (state) => {
            state.status = false
        },

        //      Watchlater Get Request

        [watchLaterGet.pending]: (state) => {
            state.status = true;
        },
        [watchLaterGet.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.watchlaterData = payload;
        },
        [watchLaterGet.rejected]: (state) => {
            state.status = false;
        },

        //      Watchlater Remove Request

        [watchlaterRemove.pending]: (state) => {
            state.status = true
        },
        [watchlaterRemove.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.watchlaterData = payload;
            toast.success("Remove from Watchlater");
        },
        [watchlaterRemove.rejected]: (state) => {
            state.status = false
        },

        //      History Post Request

        [historyPost.pending]: (state) => {
            state.status = true;
        },
        [historyPost.fulfilled]: (state) => {
            state.status = false;
        },
        [historyPost.rejected]: (state) => {
            state.status = false
        },

        //      History Get Request

        [historyGet.pending]: (state) => {
            state.status = true;
        },
        [historyGet.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.historyData = payload;
        },
        [historyGet.rejected]: (state) => {
            state.status = false;
        },

        //      History Remove Request

        [historyRemove.pending]: (state) => {
            state.status = true
        },
        [historyRemove.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.historyData = payload;
        },
        [historyRemove.rejected]: (state) => {
            state.status = false
        },

        //      All History Remove Request

        [historyRemoveAll.pending]: (state) => {
            state.status = true
        },
        [historyRemoveAll.fulfilled]: (state, { payload }) => {
            state.status = false;
            state.historyData = payload;
        },
        [historyRemoveAll.rejected]: (state) => {
            state.status = false
        }
    }
})

export const { filterCat, searchItem } = featureSlice.actions;
export default featureSlice.reducer;
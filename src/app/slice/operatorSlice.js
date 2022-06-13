import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: true,
    addfeaturesIcon: "",
    showPlaylistModel: false,
}
const operatorSlice = createSlice({
    name: "operator",
    initialState,
    reducers: {
        sideToggle: (state, action) => {
            state.toggle = action.payload;
        },

        addFeatures: (state, action) => {
            state.addfeaturesIcon = action.payload;
        },

        playlistModal: (state, { payload }) => {
            state.showPlaylistModel = payload;
        }
    }
})

export const { sideToggle, addFeatures, playlistModal } = operatorSlice.actions;
export default operatorSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: true,
    addfeaturesIcon: "",
}
const operatorSlice = createSlice({
    name: "operator",
    initialState,
    reducers: {
        sideToggle: (state, action) => {
            state.toggle = action.payload
        },
        addFeatures: (state, action) => {
            state.addfeaturesIcon = action.payload
        }
    }
})

export const { sideToggle, addFeatures } = operatorSlice.actions;
export default operatorSlice.reducer;
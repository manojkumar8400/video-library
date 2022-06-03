import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: true
}
const operatorSlice = createSlice({
    name: "operator",
    initialState,
    reducers: {
        sideToggle: (state, action) => {
            state.toggle = action.payload
        }
    }
})

export const { sideToggle } = operatorSlice.actions;
export default operatorSlice.reducer;
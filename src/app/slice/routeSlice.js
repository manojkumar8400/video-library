import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastRoute: "/",
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setLastRoute: (state, action) => {
      state.lastRoute = action.payload;
    },
  },
});

export const { setLastRoute } = routeSlice.actions;
export default routeSlice.reducer;
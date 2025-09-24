import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
    reducers: { 
    addRequest: (state, action) => action.payload,
    removeRequest: (state:any,action:any) => {
        const newState = state.filter(
        (req:any) => req.id !== action.payload
      );
      return newState;
    },
  },
});
export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
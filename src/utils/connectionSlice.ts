import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
    reducers: { 
    addConnection: (state, action) => action.payload,
    clearConnection: () => null,
  },
}); 
export const { addConnection, clearConnection } = connectionSlice.actions;
export default connectionSlice.reducer;

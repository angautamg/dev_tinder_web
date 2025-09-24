import { createSlice } from "@reduxjs/toolkit";

const toasterSlice = createSlice({
  name: "toaster",
  initialState: null as { message_type: string; message: string } | null,
  reducers: {
    showToast: (state, action) => action.payload,
    hideToast: () => null,
  },
});

export const { showToast, hideToast } = toasterSlice.actions;
export default toasterSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestSlice from "./requestSlice";
import toasterSlice from "./toasterSlice";


const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    request: requestSlice,
    connection: connectionReducer,
    toaster: toasterSlice
  },
});

export default appStore;
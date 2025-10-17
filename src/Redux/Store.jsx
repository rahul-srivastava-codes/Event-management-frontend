import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./Reducers/UserSlice";
export const store = configureStore({
  reducer: {
    user: userReducers,
  },
});

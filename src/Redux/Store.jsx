import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./Reducers/UserSlice";
import timezoneReducers from "./Reducers/Timezone";
import usernameReducers from "./Reducers/UsernameSlice";
import userdetailReducers from "./Reducers/UserdetailSlice";
export const store = configureStore({
  reducer: {
    user: userReducers,
    timezone: timezoneReducers,
    username: usernameReducers,
    userdetail: userdetailReducers, //Stores the detal of users
  },
});

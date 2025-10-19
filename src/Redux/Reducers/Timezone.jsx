import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Asia/Kolkata",
};

export const timezoneSlice = createSlice({
  name: "timezone",
  initialState,
  reducers: {
    addtimezone: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addtimezone } = timezoneSlice.actions;
export default timezoneSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "Select Profile",
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    addusername: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addusername } = usernameSlice.actions;
export default usernameSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const UserdetailSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduserdetail: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { adduserdetail } = UserdetailSlice.actions;
export default UserdetailSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userdetailSlice = createSlice({
  name: "userdetail",
  initialState: { value: [] },
  reducers: {
    adduserdetail(state, action) {
      state.value.push(action.payload);
    },
    updateUserdetail(state, action) {
      const { index, updatedEvent } = action.payload;
      if (state.value[index]) {
        state.value[index] = updatedEvent;
      }
    },
  },
});

export const { adduserdetail, updateUserdetail } = userdetailSlice.actions;
export default userdetailSlice.reducer;

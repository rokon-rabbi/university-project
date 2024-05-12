import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    userData: null // Initial state for user data
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload; // Update user data in the store
    },
    clearUser: (state) => {
      state.userData = null; // Clear user data from the store
    }
  }
});

export const { setUser, clearUser } = loginSlice.actions;

export default loginSlice.reducer;

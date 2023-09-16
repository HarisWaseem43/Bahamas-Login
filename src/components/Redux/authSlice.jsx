import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  newAccessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
    // setNewAccessToken: (state, action) => {
    //   state.newAccessToken = action.payload;
    // },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setNewAccessToken,
  clearTokens,
} = authSlice.actions;

export default authSlice.reducer;

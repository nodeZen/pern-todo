import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    errMessage: "",
    userName: "",
    userId: "",
  },
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setUserData: (state, action) => {
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuthentication,
  setErrorMessage,
  setUserData,
} = authSlice.actions;

export default authSlice.reducer;

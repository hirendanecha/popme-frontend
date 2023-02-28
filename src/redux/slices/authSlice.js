import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyRegiterEmail,
} from "../actions/authAction";

const initialState = {
  loading: false,
  data: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // registerUser
    builder.addCase(registerUser.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
      // after email thing is complete so please remove bellow line
      state.userToken = payload.link;
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // loginUser
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
      state.userToken = payload.token;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.data = null;
      state.userToken = null;
      state.error = payload;
    });

    // verifyRegiterEmail
    builder.addCase(verifyRegiterEmail.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(verifyRegiterEmail.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(verifyRegiterEmail.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // forgotPassword
    builder.addCase(forgotPassword.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
      // after email thing is complete so please remove bellow line
      state.userToken = payload.link;
    });

    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    // resetPassword
    builder.addCase(resetPassword.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    });

    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    // logoutUser
    builder.addCase(logoutUser.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    });

    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;

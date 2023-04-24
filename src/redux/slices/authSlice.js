import { createSlice } from "@reduxjs/toolkit";
import {
  changePasswordSetting,
  currentUser,
  forgotPassword,
  getToken,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateProfile,
  verifyForgotPasswordToken,
  verifyRegiterEmail,
} from "../actions/authAction";

const initialState = {
  loading: false,
  data: null,
  userToken: localStorage.getItem("token"),
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducers: {
  //   setToken(state, action) {
  //     state.token = action.payload;
  //   }},
  extraReducers: (builder) => {
    // Get Token
    builder.addCase(getToken.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state, { payload }) => {
      if (payload?.token) {
        state.userToken = payload.token;
        localStorage.setItem("token", payload.token);
      }
      state.loading = false;
    });
    builder.addCase(getToken.rejected, (state, { payload }) => {
      state.loading = false;
    });
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
      state.data = payload;
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
      state.error = payload;
    });

    // currentUser
    builder.addCase(currentUser.pending, (state, { payload }) => {
      state.loading = true;
      state.data = payload;
    });

    builder.addCase(currentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    });

    builder.addCase(currentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
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
      state.data = null;
      state.userToken = null;
    });

    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // verifyForgotPasswordToken
    builder.addCase(verifyForgotPasswordToken.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(
      verifyForgotPasswordToken.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.data = payload;
      }
    );

    builder.addCase(
      verifyForgotPasswordToken.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      }
    );

    // updateProfile
    builder.addCase(updateProfile.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    });

    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // changePasswordSetting
    builder.addCase(changePasswordSetting.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(changePasswordSetting.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    });

    builder.addCase(changePasswordSetting.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;

// export const authSliceActions = authSlice.actions;

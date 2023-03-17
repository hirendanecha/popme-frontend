import { createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../services/api/auth";
import userAPI from "../../services/api/user";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.registrationApi(userData, config);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.loginApi(userData);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const verifyRegiterEmail = createAsyncThunk(
  "user/verify",
  async (token, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyEmailApi(token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await authAPI.forgotPasswordApi(email);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const verifyForgotPasswordToken = createAsyncThunk(
  "user/verifyForgotPasswordToken",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyForgotPasswordTokenApi(data);
      return response.data;
    } catch (error) {
      if (error?.response && error?.response?.data.message) {
        return rejectWithValue(error?.response?.data?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data) => {
    try {
      const response = await authAPI.resetPasswordApi(data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const response = await userAPI.logoutApi();
    localStorage.clear();
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import settingAPI from "../../../services/api/setting";

export const getAllPlansList = createAsyncThunk(
  "setting/getAllPlansList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingAPI.getAllPlansListApi();
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

export const paymentLink = createAsyncThunk(
  "setting/paymentLink",
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingAPI.paymentLinkApi(data);
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

export const customerPortal = createAsyncThunk(
  "setting/customerPortal",
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingAPI.customerPortalApi(data);
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

export const getUserPlanDetails = createAsyncThunk(
  "setting/getUserPlanDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingAPI.getUserPlanDetailsApi();
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

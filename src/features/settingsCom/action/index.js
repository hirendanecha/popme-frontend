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

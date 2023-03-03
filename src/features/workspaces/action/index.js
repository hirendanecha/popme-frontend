import { createAsyncThunk } from "@reduxjs/toolkit";
import workSpaceAPI from "../../../services/api/workspace";

// get list of all worksapce with pagination
export const worksapceList = createAsyncThunk(
  "workspace/worksapceList",
  async (data, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.workspaceListApi();
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

// add new worksoace
export const addWorkspace = createAsyncThunk(
  "workspace/addWorkspace",
  async (data, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.addWorkspaceApi();
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

// get workspace by id
export const getWorkspaceById = createAsyncThunk(
  "workspace/getWorkspaceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.getWorkspaceByIdApi(id);
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

// get dropdown values
export const getDropdownValues = createAsyncThunk(
  "workspace/getDropdownValues",
  async (data, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.getDropdownValuesApi();
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

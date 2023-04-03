import { createAsyncThunk } from "@reduxjs/toolkit";
import workSpaceAPI from "../../../services/api/workspace";

// get list of all worksapce with pagination
export const worksapceList = createAsyncThunk(
  "workspace/worksapceList",
  async (data = "", { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.workspaceListApi(data);
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

// workspace list for dropdown
export const worksapceListForDropdown = createAsyncThunk(
  "workspace/worksapceListDropDown",
  async (data, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.workspaceListForDropdownApi();
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

// delete workspace by id
export const deleteWorkspaceById = createAsyncThunk(
  "workspace/deleteWorkspaceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.deleteWorkspaceByIdApi(id);
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

// duplicate workspace by id
export const duplicateWorkspaceById = createAsyncThunk(
  "workspace/duplicateWorkspaceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.duplicateWorkspaceByIdApi(id);
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

// update workspace options
export const updateWorkspaceOptions = createAsyncThunk(
  "workspace/updateWorkspaceOptions",
  async (data, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.updateWorkspaceApi(data);
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

// add website
export const addWebsite = createAsyncThunk(
  "workspace/addWebsite",
  async (data, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.addWebsiteApi(data);
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
export const getWorkspaceByIdentity = createAsyncThunk(
  "workspace/getWorkspaceByIdentity",
  async (id, { rejectWithValue }) => {
    try {
      const response = await workSpaceAPI.getWorkspaceByIdentityApi(id);
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

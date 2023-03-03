import { createSlice } from "@reduxjs/toolkit";
import {
  addWorkspace,
  getDropdownValues,
  getWorkspaceById,
  worksapceList,
} from "../action";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
  masterWorkspaceOptions: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  extraReducers: (builder) => {
    // worksapceList
    builder.addCase(worksapceList.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
    });

    builder.addCase(worksapceList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    });

    builder.addCase(worksapceList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    // addWorkspace
    builder.addCase(addWorkspace.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
    });

    builder.addCase(addWorkspace.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    });

    builder.addCase(addWorkspace.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    // getWorkspaceById
    builder.addCase(getWorkspaceById.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
    });

    builder.addCase(getWorkspaceById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    });

    builder.addCase(getWorkspaceById.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // get dropdown values
    builder.addCase(getDropdownValues.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
    });

    builder.addCase(getDropdownValues.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.masterWorkspaceOptions = payload;
      state.success = true;
    });

    builder.addCase(getDropdownValues.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });
  },
});

export default workspaceSlice.reducer;

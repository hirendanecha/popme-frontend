import { createSlice } from "@reduxjs/toolkit";
import {
  addWebsite,
  addWorkspace,
  getDropdownValues,
  getWorkspaceById,
  deleteWorkspaceById,
  updateWorkspaceOptions,
  worksapceList,
  worksapceListForDropdown,
  duplicateWorkspaceById,
} from "../action";

const initialState = {
  loading: false,
  data: [],
  dataDD: [],
  error: null,
  success: false,
  masterWorkspaceOptions: null,
  activeWorkspaceData: null,
  currentWebsiteUrl: "",
  // imageCrop: {
  //   unit: "px", // Can be 'px' or '%'
  //   x: 0,
  //   y: 0,
  //   width: 150,
  //   height: 150,
  //   scale: 1,
  // },

  imageCrop: {
    x: `${0 * 1}`,
    y: `${43.75 * 1}`,
    scale: 1,
  },
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setActiveWorkspaceData: (state, action) => {
      state.activeWorkspaceData = action.payload;
    },
    setCurrentWebsiteUrl: (state, action) => {
      state.currentWebsiteUrl = action.payload;
    },
    setImageCrop: (state, action) => {
      state.imageCrop = action.payload;
      state.activeWorkspaceData = {
        ...state.activeWorkspaceData,
        basicSetUp: {
          ...state.activeWorkspaceData?.basicSetUp,
          imageCrop: action?.payload,
        },
      };
    },
  },
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

    // worksapceList for dropdown
    builder.addCase(worksapceListForDropdown.pending, (state, { payload }) => {
      state.loading = true;
      state.dataDD = [];
    });

    builder.addCase(
      worksapceListForDropdown.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.dataDD = payload;
        state.success = true;
      }
    );

    builder.addCase(worksapceListForDropdown.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    // addWorkspace
    builder.addCase(addWorkspace.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(addWorkspace.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.activeWorkspaceData = payload;
      state.success = true;
    });

    builder.addCase(addWorkspace.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    // deleteWorkspaceById
    builder.addCase(deleteWorkspaceById.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
    });

    builder.addCase(deleteWorkspaceById.fulfilled, (state, { payload }) => {
      state.loading = false;
      // state.data = payload;
      state.success = true;
    });

    builder.addCase(deleteWorkspaceById.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // duplicateWorkspaceById
    builder.addCase(duplicateWorkspaceById.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
    });

    builder.addCase(duplicateWorkspaceById.fulfilled, (state, { payload }) => {
      state.loading = false;
      // state.data = payload;
      state.success = true;
    });

    builder.addCase(duplicateWorkspaceById.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // getWorkspaceById
    builder.addCase(getWorkspaceById.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getWorkspaceById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.activeWorkspaceData = payload;
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

    // update workspace options
    builder.addCase(updateWorkspaceOptions.pending, (state, { payload }) => {
      state.loading = true;
      // state.data = null;
    });

    builder.addCase(updateWorkspaceOptions.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.activeWorkspaceData = payload;
      state.success = true;
    });

    builder.addCase(updateWorkspaceOptions.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    // add website
    builder.addCase(addWebsite.pending, (state, { payload }) => {
      state.loading = true;
      state.data = null;
    });

    builder.addCase(addWebsite.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.success = true;
    });

    builder.addCase(addWebsite.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });
  },
});

export const { setActiveWorkspaceData, setCurrentWebsiteUrl, setImageCrop } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getAllPlansList } from "../action";

const initialState = {
  loading: false,
  billingPlans: [],
  error: null,
  success: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPlansList.pending, (state, { payload }) => {
      state.loading = true;
      state.billingPlans = null;
    });

    builder.addCase(getAllPlansList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.billingPlans = payload;
    });

    builder.addCase(getAllPlansList.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export default settingSlice.reducer;

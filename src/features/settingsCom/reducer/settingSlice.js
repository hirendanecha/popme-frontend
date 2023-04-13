import { createSlice } from "@reduxjs/toolkit";
import {
  customerPortal,
  getAllPlansList,
  getUserPlanDetails,
  paymentLink,
} from "../action";

const initialState = {
  loading: false,
  billingPlans: [],
  error: null,
  success: false,
  userPlanDetails: null,
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

    builder.addCase(paymentLink.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(paymentLink.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(paymentLink.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(customerPortal.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(customerPortal.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(customerPortal.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(getUserPlanDetails.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getUserPlanDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userPlanDetails = payload;
      state.success = true;
    });

    builder.addCase(getUserPlanDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default settingSlice.reducer;

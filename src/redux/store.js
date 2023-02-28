import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./slices/headerSlice";
import modalSlice from "./slices/modalSlice";
import rightDrawerSlice from "./slices/rightDrawerSlice";
import authSlice from "./slices/authSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  auth: authSlice,
};

export default configureStore({
  reducer: combinedReducer,
});

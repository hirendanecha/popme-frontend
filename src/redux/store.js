import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./slices/headerSlice";
// import modalSlice from "./slices/modalSlice";
import rightDrawerSlice from "./slices/rightDrawerSlice";
import authSlice from "./slices/authSlice";
import newModalSlice from "./slices/newModalSlice";
import workspaceSlice from "../features/workspaces/reducer/workspaceSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  // modal: modalSlice,
  auth: authSlice,
  modal: newModalSlice,
  workspace: workspaceSlice,
};

export default configureStore({
  reducer: combinedReducer,
});

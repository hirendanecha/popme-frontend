import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "./slices/headerSlice";
import modalSlice from "./slices/modalSlice";
import rightDrawerSlice from "./slices/rightDrawerSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
};

export default configureStore({
  reducer: combinedReducer,
});

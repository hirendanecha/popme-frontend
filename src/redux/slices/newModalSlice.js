import { createSlice } from "@reduxjs/toolkit";

const newModalSlice = createSlice({
  name: "newModal",
  initialState: {
    id: "",
    title: "",
    description: "",
    modalContainerClass: "",
    children: null,
    data: [],
    customWebsites: [],
    resetFormFun: null,
  },
  reducers: {
    openNewModal: (state, action) => {
      // console.log("action", action);

      const { title, description, id, children, data } = action.payload;

      // console.log("resetFormFun", resetFormFun);
      // console.log("id", id);

      state.title = title;
      state.description = description;
      state.id = id;
      state.children = children;
      // state.resetFormFun = resetFormFun;
      // state.data = data;
    },

    setModalData: (state, action) => {
      state.data = [...state.data, action.payload];
    },

    resetModalData: (state, action) => {
      state.data = [];
    },

    setCustomWebsites: (state, action) => {
      state.customWebsites = [...state.customWebsites, action.payload];
    },

    resetCustomWebsites: (state, action) => {
      state.customWebsites = [];
    },

    setResetFormFun: (state, action) => {
      state.resetFormFun = action.payload;
    },
  },
});

export const {
  openNewModal,
  setModalData,
  resetModalData,
  setCustomWebsites,
  resetCustomWebsites,
  setResetFormFun,
} = newModalSlice.actions;

export default newModalSlice.reducer;

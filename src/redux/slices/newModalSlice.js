import { createSlice } from "@reduxjs/toolkit";

const newModalSlice = createSlice({
  name: "newModal",
  initialState: {
    id: "",
    title: "",
    description: "",
    modalContainerClass: "",
    children: null,
  },
  reducers: {
    openNewModal: (state, action) => {
      // console.log("action", action);

      const { title, description, id, children } = action.payload;

      state.title = title;
      state.description = description;
      state.id = id;
      state.children = children;
    },
  },
});

export const { openNewModal } = newModalSlice.actions;

export default newModalSlice.reducer;

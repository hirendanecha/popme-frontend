import { createSlice } from "@reduxjs/toolkit";

const newModalSlice = createSlice({
  name: "newModal",
  initialState: {
    id: "",
    title: "",
    description: "",
    modalContainerClass: "",
    children: null,
    // resetFormFun: () => {},
  },
  reducers: {
    openNewModal: (state, action) => {
      // console.log("action", action);

      const { title, description, id, children } = action.payload;

      // console.log("resetFormFun", resetFormFun);
      // console.log("id", id);

      state.title = title;
      state.description = description;
      state.id = id;
      state.children = children;
      // state.resetFormFun = resetFormFun;
    },
  },
});

export const { openNewModal } = newModalSlice.actions;

export default newModalSlice.reducer;

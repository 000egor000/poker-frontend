import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState, SetModal } from "./types";

const initialState: ModalState = {
  modal: "",
  data: null,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<SetModal>) => {
      const { modal, data } = action.payload;
      state.modal = modal;
      if (data) state.data = data;
    },
  },
});

export default modalSlice.reducer;

export const { reducer, actions } = modalSlice;

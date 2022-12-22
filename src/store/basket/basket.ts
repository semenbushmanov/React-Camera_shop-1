import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BasketData } from '../../types/state';

const initialState: BasketData = {
  camerasIDs: [],
  isAddSuccessModalOpen: false,
};

export const basket = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      state.camerasIDs.push(action.payload);
      state.isAddSuccessModalOpen = true;
    },
    closeAddSuccessModal: (state) => {
      state.isAddSuccessModalOpen = false;
    },
  },
});

export const { addItem, closeAddSuccessModal } = basket.actions;

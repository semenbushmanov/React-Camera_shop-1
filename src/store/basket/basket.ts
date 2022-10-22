import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BasketData } from '../../types/state';

const initialState: BasketData = {
  camerasIDs: [],
};

export const basket = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      state.camerasIDs.push(action.payload);
    },
  },
});

export const { addItem } = basket.actions;

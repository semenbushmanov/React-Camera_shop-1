import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Settings } from '../../const';
import { BasketData } from '../../types/state';
import { BasketItem } from '../../types/camera';

const initialState: BasketData = {
  basketItems: [],
  isAddSuccessModalOpen: false,
};

export const basket = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const itemInBasket = state.basketItems.find((item) => item.id === action.payload);

      if (itemInBasket) {
        if (itemInBasket.quantity < Settings.MaxItemQuantity) {
          itemInBasket.quantity++;
        }
      } else {
        state.basketItems.push({
          id: action.payload,
          quantity: Settings.MinItemQuantity,
        });
      }

      state.isAddSuccessModalOpen = true;
    },
    closeAddSuccessModal: (state) => {
      state.isAddSuccessModalOpen = false;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInBasket = state.basketItems.find((item) => item.id === action.payload);

      if (itemInBasket) {
        if (itemInBasket.quantity < Settings.MaxItemQuantity) {
          itemInBasket.quantity++;
        }
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInBasket = state.basketItems.find((item) => item.id === action.payload);

      if (itemInBasket) {
        if (itemInBasket.quantity > Settings.MinItemQuantity) {
          itemInBasket.quantity--;
        }
      }
    },
    setQuantity: (state, action: PayloadAction<BasketItem>) => {
      const itemInBasket = state.basketItems.find((item) => item.id === action.payload.id);

      if (itemInBasket) {
        itemInBasket.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const updatedBasketItems = state.basketItems.filter((item) => item.id !== action.payload);
      state.basketItems = updatedBasketItems;
    },
  },
});

export const { addItem, closeAddSuccessModal, incrementQuantity, decrementQuantity,
  setQuantity, removeItem } = basket.actions;

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { postCouponAction, postOrderAction } from '../api-actions';
import { NameSpace, Settings } from '../../const';
import { BasketData } from '../../types/state';
import { BasketItem } from '../../types/basket';

const initialState: BasketData = {
  basketItems: [],
  isAddSuccessModalOpen: false,
  isOrderSuccessModalOpen: false,
  isPosting: false,
  invalidCoupon: false,
  coupon: null,
  discount: 0,
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
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInBasket = state.basketItems.find((item) => item.id === action.payload);

      if (itemInBasket) {
        itemInBasket.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInBasket = state.basketItems.find((item) => item.id === action.payload);

      if (itemInBasket) {
        itemInBasket.quantity--;
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
    resetCoupon: (state) => {
      state.invalidCoupon = false;
    },
    closeAddSuccessModal: (state) => {
      state.isAddSuccessModalOpen = false;
    },
    resetBasket: (state) => {
      state.basketItems = [];
      state.isOrderSuccessModalOpen = false;
      state.invalidCoupon = false;
      state.coupon = null;
      state.discount = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponAction.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postCouponAction.fulfilled, (state, action) => {
        state.coupon = action.payload.coupon;
        state.discount = action.payload.discount;
        state.isPosting = false;
      })
      .addCase(postCouponAction.rejected, (state) => {
        state.isPosting = false;
        state.invalidCoupon = true;
        state.coupon = null;
        state.discount = 0;
      })
      .addCase(postOrderAction.pending, (state) => {
        state.isPosting = true;
      })
      .addCase(postOrderAction.fulfilled, (state) => {
        state.isPosting = false;
        state.isOrderSuccessModalOpen = true;
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.isPosting = false;
      });
  }
});

export const { addItem, incrementQuantity, decrementQuantity, setQuantity,
  removeItem, resetCoupon, closeAddSuccessModal, resetBasket } = basket.actions;

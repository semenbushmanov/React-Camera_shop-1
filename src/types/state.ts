import { store } from '../store/index';
import { Cameras, Promo } from './camera';
import { BasketItem } from './basket';

export type CamerasData = {
  originalCameras: Cameras;
  isInitialLoading: boolean;
  cameras: Cameras;
  isDataLoading: boolean;
  promo: Promo;
  isPromoLoading: boolean;
  isPosting: boolean;
  reviewSuccess: boolean;
};

export type BasketData = {
  basketItems: BasketItem[];
  isAddSuccessModalOpen: boolean;
  isOrderSuccessModalOpen: boolean;
  isPosting: boolean;
  invalidCoupon: boolean;
  coupon: string | null;
  discount: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

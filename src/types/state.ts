import { store } from '../store/index';
import { Cameras, Promo } from './camera';

export type CamerasData = {
  originalCameras: Cameras;
  cameras: Cameras;
  isDataLoading: boolean;
  promo: Promo;
  isPromoLoading: boolean;
  isPosting: boolean;
  reviewSuccess: boolean;
};

export type BasketData = {
  camerasIDs: number[];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

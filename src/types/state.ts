import { store } from '../store/index';
import { Cameras, Promo } from './camera';

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
  camerasIDs: number[];
  isAddSuccessModalOpen: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

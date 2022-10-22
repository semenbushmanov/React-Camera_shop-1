import { store } from '../store/index';
import { Cameras, Promo } from './camera';

export type CamerasData = {
  cameras: Cameras;
  isDataLoading: boolean;
  promo: Promo;
};

export type BasketData = {
  camerasIDs: number[];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

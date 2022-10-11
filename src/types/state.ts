
import { store } from '../store/index';
import { Cameras, Promo } from './camera';

export type CamerasData = {
  cameras: Cameras;
  isDataLoaded: boolean;
  promo: Promo;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

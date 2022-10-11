
import { store } from '../store/index';
import { Cameras } from './camera';

export type CamerasData = {
  cameras: Cameras;
  isDataLoaded: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

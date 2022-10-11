import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Cameras, Promo } from '../../types/camera';

export const getCameras = (state: State): Cameras => state[NameSpace.Data].cameras;
export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getPromo = (state: State): Promo => state[NameSpace.Data].promo;

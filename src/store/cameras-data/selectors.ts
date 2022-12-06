import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Cameras, Promo } from '../../types/camera';

export const getOriginalCameras = (state: State): Cameras => state[NameSpace.Data].originalCameras;
export const getCameras = (state: State): Cameras => state[NameSpace.Data].cameras;
export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDataLoading;
export const getPromoLoadingStatus = (state: State): boolean => state[NameSpace.Data].isPromoLoading;
export const getPromo = (state: State): Promo => state[NameSpace.Data].promo;
export const getPostingStatus = (state: State): boolean => state[NameSpace.Data].isPosting;
export const getReviewSuccessStatus = (state: State): boolean => state[NameSpace.Data].reviewSuccess;

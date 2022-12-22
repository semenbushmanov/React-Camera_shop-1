import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketItems = (state: State): number[] => state[NameSpace.Basket].camerasIDs;
export const getAddSuccessModalStatus = (state: State): boolean => state[NameSpace.Basket].isAddSuccessModalOpen;

import { NameSpace } from '../../const';
import { BasketItem } from '../../types/basket';
import { State } from '../../types/state';

export const getBasketItems = (state: State): BasketItem[] => state[NameSpace.Basket].basketItems;
export const getAddSuccessModalStatus = (state: State): boolean => state[NameSpace.Basket].isAddSuccessModalOpen;

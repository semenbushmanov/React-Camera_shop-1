import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getBasketItems = (state: State): number[] => state[NameSpace.Basket].camerasIDs;

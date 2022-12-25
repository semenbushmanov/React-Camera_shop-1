import { NameSpace } from '../../const';
import { BasketItem } from '../../types/basket';
import { State } from '../../types/state';

export const getBasketItems = (state: State): BasketItem[] => state[NameSpace.Basket].basketItems;
export const getAddSuccessModalStatus = (state: State): boolean => state[NameSpace.Basket].isAddSuccessModalOpen;
export const getPostingStatus = (state: State): boolean => state[NameSpace.Basket].isPosting;
export const getCouponErrorStatus = (state: State): boolean => state[NameSpace.Basket].invalidCoupon;
export const getCoupon = (state: State): string | null => state[NameSpace.Basket].coupon;
export const getDiscount = (state: State): number => state[NameSpace.Basket].discount;

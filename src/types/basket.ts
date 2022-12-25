import { Camera } from './camera';

export type CouponPost = {
  coupon: string;
};

export type OrderPost = {
	camerasIds: number[];
	coupon: string | null;
};

export type BasketItem = {
	id: number;
	quantity: number;
};

export type BasketItemData = {
	camera: Camera;
	quantity: number;
};

export type Coupon = {
	coupon: string;
	discount: number;
};

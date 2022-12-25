import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Cameras, Promo, ReviewPost } from '../types/camera';
import { Coupon, CouponPost } from '../types/basket';
import { APIRoute } from '../const';

export const fetchOriginalCamerasAction = createAsyncThunk<Cameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOriginalCameras',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Cameras>(APIRoute.Cameras);
    return data;
  },
);

export const fetchCamerasAction = createAsyncThunk<Cameras, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (params, {dispatch, extra: api}) => {
    const queryParams = params ? `?${params}` : '';
    const {data} = await api.get<Cameras>(`${APIRoute.Cameras}${queryParams}`);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async (review, {dispatch, extra: api}) => {
    await api.post(APIRoute.Reviews, review);
  },
);

export const postCouponAction = createAsyncThunk<Coupon, CouponPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postCoupon',
  async (couponPost, {dispatch, extra: api}) => {
    const {data} = await api.post<number>(APIRoute.Coupons, couponPost);
    return { coupon: couponPost.coupon, discount: data };
  },
);

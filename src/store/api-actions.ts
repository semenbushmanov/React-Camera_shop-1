import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Cameras, Promo, ReviewPost } from '../types/camera';
import { QueryParamsType } from '../types/query';
import { APIRoute } from '../const';

export const fetchCamerasAction = createAsyncThunk<Cameras, {params: QueryParamsType | undefined}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async ({params}, {dispatch, extra: api}) => {
    const {data} = await api.get<Cameras>(APIRoute.Cameras, {params});
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

export const postReviewAction = createAsyncThunk<void, {review: ReviewPost}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({review}, {dispatch, extra: api}) => {
    await api.post(APIRoute.Reviews, review);
  },
);

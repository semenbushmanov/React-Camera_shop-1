import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api } from '../services/api';
import { fetchOriginalCamerasAction, fetchCamerasAction, fetchPromoAction,
  postReviewAction, postCouponAction, postOrderAction } from './api-actions';
import { makeFakeCamera, makeFakePromo, makeFakeReviewPost } from '../utils/mocks';
import { State } from '../types/state';
import { APIRoute } from '../const';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch data/fetchOriginalCameras when GET /cameras at app start', async () => {
    const mockCameras = [ makeFakeCamera(), makeFakeCamera() ];
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchOriginalCamerasAction());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchOriginalCamerasAction.pending.type,
      fetchOriginalCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch data/fetchCameras when GET /cameras on url params change', async () => {
    const mockCameras = [ makeFakeCamera(), makeFakeCamera() ];
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, mockCameras);

    const store = mockStore();

    await store.dispatch(fetchCamerasAction(''));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch data/fetchPromo when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch data/postReview when POST /reviews', async () => {
    const mockReviewPost = makeFakeReviewPost();
    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postReviewAction(mockReviewPost));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch data/postCoupon when POST /coupons', async () => {
    const mockCoupon = {coupon: 'camera-333'};
    mockAPI
      .onPost(APIRoute.Coupons)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postCouponAction(mockCoupon));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      postCouponAction.pending.type,
      postCouponAction.fulfilled.type
    ]);
  });

  it('should dispatch data/postOrder when POST /orders', async () => {
    const mockOrder = {camerasIds: [1, 3], coupon: null};
    mockAPI
      .onPost(APIRoute.Orders)
      .reply(200);

    const store = mockStore();

    await store.dispatch(postOrderAction(mockOrder));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      postOrderAction.pending.type,
      postOrderAction.fulfilled.type
    ]);
  });
});

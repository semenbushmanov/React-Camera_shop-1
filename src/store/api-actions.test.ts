import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { api } from '../services/api';
import { fetchOriginalCamerasAction, fetchCamerasAction, fetchPromoAction, postReviewAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { makeFakeCamera, makeFakePromo, makeFakeReviewPost } from '../utils/mocks';

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

  it('should dispatch data/fetchOriginalCameras when GET /cameras on url params change', async () => {
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

    await store.dispatch(postReviewAction({review: mockReviewPost}));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      postReviewAction.fulfilled.type
    ]);
  });
});

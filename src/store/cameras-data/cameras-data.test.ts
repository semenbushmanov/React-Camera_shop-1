import { camerasData, resetReviewSuccess } from './cameras-data';
import { makeFakeCamera, makeFakePromo, makeFakeReviewPost } from '../../utils/mocks';
import { fetchOriginalCamerasAction, fetchCamerasAction, fetchPromoAction, postReviewAction } from '../api-actions';
import { Promo } from '../../types/camera';

const fakeCameras = [ makeFakeCamera(), makeFakeCamera() ];
const fakePromo = makeFakePromo();
const fakeReviewPost = makeFakeReviewPost();

describe('Reducer: camerasData', () => {
  it('should return initial state without additional parameters', () => {
    expect(camerasData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        originalCameras: [],
        isInitialLoading: false,
        cameras: [],
        isDataLoading:false,
        promo: {} as Promo,
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: false,
      });
  });

  it('should update originalCameras and cameras by initial loading cameras', () => {
    const state = {
      originalCameras: [],
      isInitialLoading: false,
      cameras: [],
      isDataLoading:false,
      promo: {} as Promo,
      isPromoLoading: false,
      isPosting: false,
      reviewSuccess: false,
    };

    expect(camerasData.reducer(state, {type: fetchOriginalCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({
        originalCameras: fakeCameras,
        isInitialLoading: false,
        cameras: fakeCameras,
        isDataLoading:false,
        promo: {},
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: false,
      });
  });

  it('should update cameras by loading cameras when url params change', () => {
    const state = {
      originalCameras: fakeCameras,
      isInitialLoading: false,
      cameras: [],
      isDataLoading:false,
      promo: {} as Promo,
      isPromoLoading: false,
      isPosting: false,
      reviewSuccess: false,
    };

    expect(camerasData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({
        originalCameras: fakeCameras,
        isInitialLoading: false,
        cameras: fakeCameras,
        isDataLoading:false,
        promo: {},
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: false,
      });
  });

  it('should update promo by loading promo', () => {
    const state = {
      originalCameras: [],
      isInitialLoading: false,
      cameras: [],
      isDataLoading:false,
      promo: {} as Promo,
      isPromoLoading: false,
      isPosting: false,
      reviewSuccess: false,
    };

    expect(camerasData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: fakePromo}))
      .toEqual({
        originalCameras: [],
        isInitialLoading: false,
        cameras: [],
        isDataLoading:false,
        promo: fakePromo,
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: false,
      });
  });

  it('should set reviewSuccess true after posting review', () => {
    const state = {
      originalCameras: [],
      isInitialLoading: false,
      cameras: [],
      isDataLoading:false,
      promo: {} as Promo,
      isPromoLoading: false,
      isPosting: false,
      reviewSuccess: false,
    };

    expect(camerasData.reducer(state, {type: postReviewAction.fulfilled.type, payload: fakeReviewPost}))
      .toEqual({
        originalCameras: [],
        isInitialLoading: false,
        cameras: [],
        isDataLoading:false,
        promo: {} as Promo,
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: true,
      });
  });

  it('should reset reviewSuccess false when resetReviewSuccess', () => {
    const state = {
      originalCameras: [],
      isInitialLoading: false,
      cameras: [],
      isDataLoading:false,
      promo: {} as Promo,
      isPromoLoading: false,
      isPosting: false,
      reviewSuccess: true,
    };

    expect(camerasData.reducer(state, resetReviewSuccess()))
      .toEqual({
        originalCameras: [],
        isInitialLoading: false,
        cameras: [],
        isDataLoading:false,
        promo: {} as Promo,
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: false,
      });
  });
});

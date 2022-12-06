import { camerasData } from './cameras-data';
import { makeFakeCamera } from '../../utils/mocks';
import { fetchCamerasAction } from '../api-actions';
import { Promo } from '../../types/camera';

const fakeCameras = [ makeFakeCamera(), makeFakeCamera() ];

describe('Reducer: camerasData', () => {
  it('should return initial state without additional parameters', () => {
    expect(camerasData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        originalCameras: [],
        cameras: [],
        isDataLoading:false,
        promo: {} as Promo,
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: false,
      });
  });

  it('should update cameras by loading cameras', () => {
    const state = {
      originalCameras: [],
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
        cameras: fakeCameras,
        isDataLoading:false,
        promo: {},
        isPromoLoading: false,
        isPosting: false,
        reviewSuccess: false,
      });
  });
});

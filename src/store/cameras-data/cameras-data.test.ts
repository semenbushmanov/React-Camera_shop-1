import { camerasData } from './cameras-data';
import { makeFakeCamera } from '../../utils/mocks';
import { fetchCamerasAction } from '../api-actions';
import { Promo } from '../../types/camera';

const fakeCameras = [ makeFakeCamera(), makeFakeCamera() ];

describe('Reducer: camerasData', () => {
  it('should return initial state without additional parameters', () => {
    expect(camerasData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        cameras: [],
        isDataLoading:false,
        promo: {} as Promo,
        isPosting: false,
        reviewSuccess: false,
      });
  });

  it('should update cameras by loading cameras', () => {
    const state = {
      cameras: [],
      isDataLoading:false,
      promo: {} as Promo,
      isPosting: false,
      reviewSuccess: false,
    };

    expect(camerasData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({
        cameras: fakeCameras,
        isDataLoading:false,
        promo: {},
        isPosting: false,
        reviewSuccess: false,
      });
  });
});

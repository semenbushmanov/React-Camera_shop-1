import MockAdapter from 'axios-mock-adapter';
import { renderHook, waitFor } from '@testing-library/react';
import { api } from '../../services/api';
import { APIRoute } from '../../const';
import { useFetchSimilarCameras } from './use-fetch-similar-cameras';
import { makeFakeCamera } from '../../utils/mocks';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  it('should fetch similar cameras by id', async () => {
    const mockCameras = [ makeFakeCamera(), makeFakeCamera() ];
    mockAPI
      .onGet(`${APIRoute.Cameras}/2/similar`)
      .reply(200, mockCameras);

    const { result } = renderHook(() =>
      useFetchSimilarCameras('2'),
    );

    await waitFor(() => {
      const [ similarCameras ] = result.current;
      expect(similarCameras).toEqual(mockCameras);
    });

  });
});

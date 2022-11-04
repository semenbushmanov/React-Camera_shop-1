import MockAdapter from 'axios-mock-adapter';
import { renderHook, waitFor } from '@testing-library/react';
import { api } from '../../services/api';
import { APIRoute } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';
import { useFetchCamera } from './use-fetch-camera';
import { RequestStatus } from '../../const';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  it('should fetch camera by id', async () => {
    const mockCamera = makeFakeCamera();
    mockAPI
      .onGet(`${APIRoute.Cameras}/2`)
      .reply(200, mockCamera);

    const { result } = renderHook(() =>
      useFetchCamera('2'),
    );

    const [ , status ] = result.current;

    expect(status).toBe(RequestStatus.Loading);

    await waitFor(() => {
      const [ camera ] = result.current;
      expect(camera).toEqual(mockCamera);
    });

  });
});

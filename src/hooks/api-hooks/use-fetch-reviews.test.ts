import MockAdapter from 'axios-mock-adapter';
import { renderHook, waitFor } from '@testing-library/react';
import { api } from '../../services/api';
import { APIRoute } from '../../const';
import { useFetchReviews } from './use-fetch-reviews';
import { makeFakeReview } from '../../utils/mocks';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  it('should fetch reviews by id', async () => {
    const mockReviews = [ makeFakeReview(), makeFakeReview() ];
    mockAPI
      .onGet(`${APIRoute.Cameras}/2/reviews`)
      .reply(200, mockReviews);

    const { result } = renderHook(() =>
      useFetchReviews('2', false),
    );

    await waitFor(() => {
      const [ reviews ] = result.current;
      expect(reviews).toEqual(mockReviews);
    });

  });
});

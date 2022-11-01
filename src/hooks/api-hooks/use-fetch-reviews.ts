import { useState, useCallback, useEffect } from 'react';
import { useIsAlive } from './use-is-alive';
import { APIRoute } from '../../const';
import { api } from '../../services/api';
import { Reviews } from '../../types/camera';

export const useFetchReviews = (id: string | undefined, reviewSuccessStatus: boolean) => {
  const [ reviews, setReviews ] = useState<Reviews>([]);
  const isAlive = useIsAlive();

  const fetch = useCallback(async () => {
    if (id) {
      const {data} = await api.get<Reviews>(`${APIRoute.Cameras}/${id}/reviews`);

      if (isAlive.current && data) {
        setReviews(data);
      }
    }
  }, [isAlive, setReviews, id]);

  useEffect(() => {
    if (reviewSuccessStatus) {
      fetch();
    }
  }, [fetch, reviewSuccessStatus]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [ reviews ] as const;
};

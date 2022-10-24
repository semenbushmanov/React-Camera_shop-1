import { useState, useCallback, useEffect } from 'react';
import { useIsAlive } from './use-is-alive';
import { APIRoute } from '../../const';
import { api } from '../../services/api';
import { Cameras } from '../../types/camera';

export const useFetchSimilarCameras = (id: string | undefined) => {
  const [similarCameras, setSimilarCameras] = useState<Cameras>([]);
  const isAlive = useIsAlive();

  const fetch = useCallback(async () => {
    if (id) {
      const {data} = await api.get<Cameras>(`${APIRoute.Cameras}/${id}/similar`);

      if (isAlive.current && data) {
        setSimilarCameras(data);
      }
    }
  }, [isAlive, setSimilarCameras, id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [similarCameras] as const;
};

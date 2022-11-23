import { useState, useCallback, useEffect } from 'react';
import { useIsAlive } from './use-is-alive';
import { APIRoute } from '../../const';
import { api } from '../../services/api';
import { Cameras } from '../../types/camera';

export const useFetchCameraSearch = (letters: string | undefined) => {
  const [ cameras, setCameras ] = useState<Cameras>([]);
  const isAlive = useIsAlive();

  const fetch = useCallback(async () => {
    if (letters) {
      const {data} = await api.get<Cameras>(`${APIRoute.Cameras}?name_like=${letters}`);

      if (isAlive.current && data) {
        setCameras(data);
      }
    }
  }, [isAlive, setCameras, letters]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [cameras] as const;
};

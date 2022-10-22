import { useState, useCallback, useEffect } from 'react';
import { useIsAlive } from './use-is-alive';
import { RequestStatus, APIRoute } from '../../const';
import { api } from '../../services/api';
import { Camera } from '../../types/camera';

export const useFetchCamera = (id: string | undefined) => {
  const [camera, setCamera] = useState<Camera | undefined>();
  const [status, setStatus] = useState(RequestStatus.NotStarted);
  const isAlive = useIsAlive();

  const fetch = useCallback(async () => {
    if (id) {
      setStatus(RequestStatus.Loading);

      try {
        const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);

        if (isAlive.current && data) {
          setCamera(data);
          setStatus(RequestStatus.Success);
        }
      } catch(error) {
        if (isAlive.current){
          setStatus(RequestStatus.Error);
        }
      }
    }
  }, [isAlive, setCamera, setStatus, id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return [camera, status] as const;
};

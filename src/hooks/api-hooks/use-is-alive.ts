import { useRef, useEffect } from 'react';

export const useIsAlive = () => {
  const isAlive = useRef(true);

  useEffect(() => {
    isAlive.current = true;
    return () => {
      isAlive.current = false;
    };
  }, []);

  return isAlive;
};

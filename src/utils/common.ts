import { Cameras, Review } from '../types/camera';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const formatReviewDate = (date: string) => dayjs(date).locale('ru').format('D MMMM');

export const sortReviewsByDate = (reviewA: Review, reviewB: Review) => {
  if (reviewA.createAt < reviewB.createAt) {
    return 1;
  }

  if (reviewA.createAt > reviewB.createAt) {
    return -1;
  }

  return 0;
};

const getSortedPrices = (cameras: Cameras) => {
  if (cameras.length === 0) {
    return [0];
  }

  const cameraPrices = cameras.map((camera) => camera.price);
  cameraPrices.sort((a, b) => a - b);

  return cameraPrices;
};

export const getMinPrice = (cameras: Cameras) => {
  const sortedCameraPrices = getSortedPrices(cameras);

  return sortedCameraPrices[0];
};

export const getMaxPrice = (cameras: Cameras) => {
  const sortedCameraPrices = getSortedPrices(cameras);

  return sortedCameraPrices[cameras.length - 1];
};

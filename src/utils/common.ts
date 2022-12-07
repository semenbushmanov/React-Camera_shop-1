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

export const getSortedPrices = (cameras: Cameras) => {
  if (cameras.length === 0) {
    return [0];
  }

  const cameraPrices = cameras.map((camera) => camera.price);
  cameraPrices.sort((a, b) => a - b);

  return cameraPrices;
};

export const getMinPrice = (sortedPrices: number[]) => sortedPrices[0];
export const getMaxPrice = (sortedPrices: number[]) => sortedPrices[sortedPrices.length - 1];

export const getClosestMinPrice = (userPrice: number, sortedPrices: number[]) => {
  const minSortedPrices = sortedPrices.filter((price) => price <= userPrice);

  return minSortedPrices[minSortedPrices.length - 1];
};

export const getClosestMaxPrice = (userPrice: number, sortedPrices: number[]) => {
  const minSortedPrices = sortedPrices.filter((price) => price >= userPrice);

  return minSortedPrices[0];
};

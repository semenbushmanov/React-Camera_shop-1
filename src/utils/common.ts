import { Review } from '../types/camera';
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

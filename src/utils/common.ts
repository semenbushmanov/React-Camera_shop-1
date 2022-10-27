import { Review } from '../types/camera';

export const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const sortReviewsByDate = (reviewA: Review, reviewB: Review) => {
  if (reviewA.createAt < reviewB.createAt) {
    return 1;
  }

  if (reviewA.createAt > reviewB.createAt) {
    return -1;
  }

  return 0;
};

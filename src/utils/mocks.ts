import { system, datatype, commerce, finance, name, lorem, date } from 'faker';
import { Camera, ReviewPost, Promo, Review } from '../types/camera';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: finance.bitcoinAddress(),
  type: commerce.productAdjective(),
  category: commerce.product(),
  description: commerce.productDescription(),
  level: commerce.productAdjective(),
  rating: datatype.number({
    min: 1,
    max: 5,
  }),
  price: datatype.number({
    min: 1,
    max: 500000,
  }),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
  reviewCount: datatype.number({
    min: 1,
    max: 5,
  }),
} as Camera);

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: system.filePath(),
  previewImg2x: system.filePath(),
  previewImgWebp: system.filePath(),
  previewImgWebp2x: system.filePath(),
} as Promo);

export const makeFakeReviewPost = (): ReviewPost => ({
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(),
  rating: datatype.number({
    min: 1,
    max: 5,
  }),
} as ReviewPost);

export const makeFakeReview = (): Review => ({
  id: finance.account(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentence(),
  rating: datatype.number({
    min: 1,
    max: 5,
  }),
  createAt: date.recent().toString(),
  cameraId: datatype.number(),
} as Review);

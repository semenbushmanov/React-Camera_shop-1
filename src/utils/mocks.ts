import { system, datatype, commerce, finance } from 'faker';
import { Camera } from '../types/camera';

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

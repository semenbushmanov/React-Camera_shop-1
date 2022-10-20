import ProductCard from '../product-card/product-card';
import { Camera, Cameras } from '../../types/camera';
import { memo } from 'react';

type ProductCardsListProps = {
  cameras: Cameras;
  currentPage: number;
  openAddItemPopup: (camera: Camera) => void;
};

function ProductCardsList({cameras, currentPage, openAddItemPopup}: ProductCardsListProps): JSX.Element {
  const startingPoint = (currentPage - 1) * 9;
  const finalPoint = startingPoint + 9;
  const camerasToRender = cameras.slice(startingPoint, finalPoint);

  return (
    <div className="cards catalog__cards">
      {camerasToRender.map(
        (camera) => (
          <ProductCard
            key={camera.id}
            camera= {camera}
            isInBasket={false}
            openAddItemPopup={openAddItemPopup}
          />)
      )}
    </div>
  );
}

export default memo(ProductCardsList);

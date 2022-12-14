import ProductCard from '../product-card/product-card';
import { Settings } from '../../const';
import { Camera, Cameras } from '../../types/camera';
import { getBasketItems } from '../../store/basket/selectors';
import { useAppSelector } from '../../hooks';
import { memo } from 'react';

type ProductCardsListProps = {
  cameras: Cameras;
  currentPage: number;
  openAddItemModal: (camera: Camera) => void;
};

const PAGE_TO_INDEX_DIFFERENCE = 1;

function ProductCardsList({cameras, currentPage, openAddItemModal}: ProductCardsListProps): JSX.Element {
  const basketItems = useAppSelector(getBasketItems);
  const basketItemsIDs = basketItems.map((item) => item.id);
  const startingPoint = (currentPage - PAGE_TO_INDEX_DIFFERENCE) * Settings.CardsOnPageNumber;
  const finalPoint = startingPoint + Settings.CardsOnPageNumber;
  const camerasToRender = cameras.slice(startingPoint, finalPoint);

  if (cameras.length === 0) {
    return <p>по вашему запросу ничего не найдено</p>;
  }

  return (
    <div className="cards catalog__cards">
      {camerasToRender.map(
        (camera) => (
          <ProductCard
            key={camera.id}
            camera={camera}
            isInBasket={basketItemsIDs.includes(camera.id)}
            openAddItemModal={openAddItemModal}
          />)
      )}
    </div>
  );
}

export default memo(ProductCardsList);

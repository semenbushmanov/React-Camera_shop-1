import ProductCard from '../product-card/product-card';
import { Cameras } from '../../types/camera';

type ProductCardsListProps = {
  cameras: Cameras;
  currentPage: number;
};

function ProductCardsList({cameras, currentPage}: ProductCardsListProps): JSX.Element {
  const startingPoint = (currentPage - 1) * 9;
  const finalPoint = startingPoint + 9;
  const camerasToRender = cameras.slice(startingPoint, finalPoint);

  return (
    <div className="cards catalog__cards">
      {camerasToRender.map((camera) => <ProductCard key={camera.id} camera= {camera} isInBasket={false}/>)}
    </div>
  );
}

export default ProductCardsList;

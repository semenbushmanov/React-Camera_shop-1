import ProductCard from '../product-card/product-card';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/selectors';

function ProductCardsList(): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const camerasToRender = cameras.slice(0, 9);

  return (
    <div className="cards catalog__cards">
      {camerasToRender.map((camera) => <ProductCard key={camera.id} camera= {camera} isInBasket={false}/>)}
    </div>
  );
}

export default ProductCardsList;

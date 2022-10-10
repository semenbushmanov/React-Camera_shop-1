import ProductCard from '../product-card/product-card';

function ProductCardsList(): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {[...Array(9).keys()].map((item) => <ProductCard key={item} isInBasket={false}/>)}
    </div>
  );
}

export default ProductCardsList;

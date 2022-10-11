import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';

type ProductCardProps = {
  camera: Camera;
  isInBasket: boolean;
};

function ProductCard({camera, isInBasket}: ProductCardProps): JSX.Element {
  const { name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = camera;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating > 0 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating > 1 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating > 2 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating > 3 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating > 4 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isInBasket ?
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>
          :
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>}
        <Link className="btn btn--transparent" to={AppRoute.Item}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

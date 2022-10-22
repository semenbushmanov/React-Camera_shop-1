import RatingStars from '../rating-stars/rating-stars';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';
import { memo } from 'react';
import { formatPrice } from '../../utils/common';

type ProductCardProps = {
  camera: Camera;
  isInBasket: boolean;
  openAddItemModal: (camera: Camera) => void;
};

function ProductCard({camera, isInBasket, openAddItemModal}: ProductCardProps): JSX.Element {
  const { id, name, rating, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount } = camera;

  const handleBuyButtonClick = () => {
    openAddItemModal(camera);
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="280" height="240" alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <RatingStars rating={rating} reviewCount={reviewCount}/>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
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
          <button className="btn btn--purple product-card__btn" type="button" onClick={handleBuyButtonClick}>Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Item}/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default memo(ProductCard);

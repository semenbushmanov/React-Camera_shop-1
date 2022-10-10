import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type ProductCardProps = {
  isInBasket: boolean;
};

function ProductCard({isInBasket}: ProductCardProps): JSX.Element {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x"/>
          <img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
        </div>
        <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
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
          </button>
        }
        <Link className="btn btn--transparent" to={AppRoute.Item}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

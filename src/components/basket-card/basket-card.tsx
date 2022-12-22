import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/common';
import { memo } from 'react';

type BasketCardProps = {
  camera: Camera;
  quantity: number;
};

function BasketCard({camera, quantity}: BasketCardProps): JSX.Element {
  const { name, vendorCode, type, category, level, price,
    previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = camera;

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="140" height="120" alt={name}/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{`${type} ${category.toLowerCase()}`}</li>
          <li className="basket-item__list-item">{`${level} уровень`}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>
        {`${formatPrice(price)} ₽`}
      </p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" readOnly value={quantity} min="1" max="99" aria-label="количество товара"/>
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара">
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{`${formatPrice(price * quantity)} ₽`}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default memo(BasketCard);

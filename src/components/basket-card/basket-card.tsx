import { memo, ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { incrementQuantity, decrementQuantity, setQuantity } from '../../store/basket/basket';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/common';
import { Settings } from '../../const';
import { toast } from 'react-toastify';

type BasketCardProps = {
  camera: Camera;
  quantity: number;
  removeItem: (camera: Camera) => void;
};

function BasketCard({camera, quantity, removeItem}: BasketCardProps): JSX.Element {
  const { id, name, vendorCode, type, category, level, price,
    previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = camera;

  const dispatch = useAppDispatch();
  const [ currentQuantity, setCurrentQuantity ] = useState<number | ''>(quantity);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  const handleQuantityInput = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.value === '') {
      setCurrentQuantity('');

      return;
    }

    if (Number(target.value) > 0) {
      const itemQuantity = Math.round(Number(target.value));

      if (itemQuantity < Settings.MinItemQuantity) {
        setCurrentQuantity(Settings.MinItemQuantity);

        return;
      }

      if (itemQuantity > Settings.MaxItemQuantity) {
        setCurrentQuantity(Settings.MaxItemQuantity);
        toast.warn(`Максимальное количество - ${Settings.MaxItemQuantity} штук`);

        return;
      }

      setCurrentQuantity(itemQuantity);
      return;
    }

    toast.warn('Можно ввести только целое положительное число');
  };

  const handleQuantityChange = () => {
    if (currentQuantity) {
      dispatch(setQuantity({id: id, quantity: currentQuantity}));

      return;
    }

    setCurrentQuantity(quantity);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      handleQuantityChange();
    }
  };

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
            <span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {`${type} ${category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}`}
          </li>
          <li className="basket-item__list-item">{`${level} уровень`}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>
        {`${formatPrice(price)} ₽`}
      </p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара"
          onClick={() => dispatch(decrementQuantity(id))} disabled={quantity === Settings.MinItemQuantity}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter${id}`}></label>
        <input type="number" id={`counter${id}`} min="1" max="99" aria-label="количество товара"
          value={currentQuantity} onChange={handleQuantityInput} onBlur={handleQuantityChange}
          onKeyDown={handleKeyDown}
        />
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара"
          onClick={() => dispatch(incrementQuantity(id))} disabled={quantity === Settings.MaxItemQuantity}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{`${formatPrice(price * quantity)} ₽`}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар"
        onClick={() => removeItem(camera)}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export default memo(BasketCard);

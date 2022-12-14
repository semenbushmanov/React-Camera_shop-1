import { memo, useEffect, useRef, useState } from 'react';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utils/common';
import { useAppDispatch } from '../../hooks/index';
import { addItem } from '../../store/basket/basket';

type AddItemModalProps = {
  camera: Camera;
  closeModal: () => void;
};

function AddItemModal({camera, closeModal}: AddItemModalProps): JSX.Element {
  const { id, name, vendorCode, type, category, level, price,
    previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = camera;

  const dispatch = useAppDispatch();
  const [ isAddButtonFocused, setAddButtonFocused ] = useState(false);
  const addItemButton = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const handleAddItemButtonClick = () => {
    dispatch(addItem(id));
    closeModal();
  };

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeModal();
      }

      if (evt.key === 'Tab') {
        evt.preventDefault();
        if (isAddButtonFocused) {
          closeButton.current?.focus();
          setAddButtonFocused(false);

          return;
        }

        addItemButton.current?.focus();
        setAddButtonFocused(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal, isAddButtonFocused]);

  return (
    <div className="modal is-active" onClick={closeModal}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => {evt.stopPropagation();}}>
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
                <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`}
                  width="140" height="120" alt={name}
                />
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
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
              ref={addItemButton} onClick={handleAddItemButtonClick}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            ref={closeButton} onClick={closeModal}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(AddItemModal);

import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/index';
import { removeItem } from '../../store/basket/basket';
import { Camera } from '../../types/camera';

type RemoveItemModalProps = {
  camera: Camera;
  closeModal: () => void;
};

function RemoveItemModal({camera, closeModal}: RemoveItemModalProps): JSX.Element {
  const { id, name, vendorCode, type, category, level,
    previewImg, previewImg2x, previewImgWebp, previewImgWebp2x } = camera;

  const dispatch = useAppDispatch();
  const firstFocusableElement = useRef<HTMLAnchorElement | null>(null);
  const lastFocusableElement = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let isTabPressedFirstTime = true;

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeModal();
      }

      if (evt.key === 'Tab') {
        if (isTabPressedFirstTime) {
          evt.preventDefault();
          firstFocusableElement.current?.focus();
          isTabPressedFirstTime = false;

          return;
        }

        if (evt.shiftKey) {
          if (document.activeElement === firstFocusableElement.current) {
            evt.preventDefault();
            lastFocusableElement.current?.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement.current) {
            evt.preventDefault();
            firstFocusableElement.current?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal]);

  const handleRemoveButtonClick = () => {
    dispatch(removeItem(id));
    closeModal();
  };

  return (
    <div className="modal is-active" onClick={closeModal}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => {evt.stopPropagation();}}>
          <p className="title title--h4">Удалить этот товар?</p>
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
                <li className="basket-item__list-item">{`${level} уровень`}</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button"
              onClick={handleRemoveButtonClick}
            >Удалить
            </button>
            <Link className="btn btn--transparent modal__btn modal__btn--half-width" to=''
              onClick={closeModal}
            >Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={closeModal}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(RemoveItemModal);

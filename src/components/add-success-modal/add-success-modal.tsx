import { memo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/index';
import { closeAddSuccessModal } from '../../store/basket/basket';
import { AppRoute } from '../../const';

type AddSuccessModalProps = {
  isCatalog?: boolean;
};

function AddSuccessModal({isCatalog}: AddSuccessModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const firstFocusableElement = useRef<HTMLAnchorElement | null>(null);
  const lastFocusableElement = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let isTabPressedFirstTime = true;

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        dispatch(closeAddSuccessModal());
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
  }, [dispatch]);

  const closeModal = () => {
    dispatch(closeAddSuccessModal());
  };

  const navigateToBasket = () => {
    dispatch(closeAddSuccessModal());
    navigate(AppRoute.Basket);
  };

  return (
    <div className="modal is-active modal--narrow" onClick={closeModal}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => {evt.stopPropagation();}}>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to={isCatalog ? '' : AppRoute.Root}
              ref={firstFocusableElement} onClick={closeModal}
            >Продолжить покупки
            </Link>
            <button className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={navigateToBasket}
            >Перейти в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            ref={lastFocusableElement} onClick={closeModal}
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

export default memo(AddSuccessModal);

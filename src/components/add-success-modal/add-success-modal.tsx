import { memo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type AddReviewModalProps = {
  closeAddSuccessModal: () => void;
};

function AddSuccessModal({closeAddSuccessModal}: AddReviewModalProps): JSX.Element {
  const navigate = useNavigate();
  const firstFocusableElement = useRef<HTMLAnchorElement | null>(null);
  const lastFocusableElement = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let isTabPressedFirstTime = true;

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeAddSuccessModal();
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
  }, [closeAddSuccessModal]);

  return (
    <div className="modal is-active modal--narrow" onClick={closeAddSuccessModal}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => {evt.stopPropagation();}}>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to={AppRoute.Catalog}
              ref={firstFocusableElement} onClick={closeAddSuccessModal}
            >Продолжить покупки
            </Link>
            <button className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={() => navigate(AppRoute.Basket)}
            >Перейти в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            ref={lastFocusableElement} onClick={closeAddSuccessModal}
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

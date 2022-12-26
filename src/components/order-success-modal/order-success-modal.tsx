import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/index';
import { resetBasket } from '../../store/basket/basket';

type OrderSuccessModalProps = {
  onClose: () => void;
};

function OrderSuccessModal({onClose}: OrderSuccessModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [ isBackButtonFocused, setBackButtonFocused ] = useState(false);
  const backButton = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    onClose();
    dispatch(resetBasket());
  }, [dispatch, onClose]);

  const handleBackButtonClick = () => {
    closeModal();
    navigate(AppRoute.Root);
  };

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeModal();
      }

      if (evt.key === 'Tab') {
        evt.preventDefault();
        if (isBackButtonFocused) {
          closeButton.current?.focus();
          setBackButtonFocused(false);

          return;
        }

        backButton.current?.focus();
        setBackButtonFocused(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [closeModal, isBackButtonFocused]);

  return (
    <div className="modal is-active modal--narrow" onClick={closeModal}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => {evt.stopPropagation();}}>
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
              onClick={handleBackButtonClick} ref={backButton}
            >Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            onClick={closeModal} ref={closeButton}
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

export default memo(OrderSuccessModal);

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { resetReviewSuccess } from '../../store/action';

function ReviewSuccessModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const [ isBackButtonFocused, setBackButtonFocused ] = useState(false);
  const backButton = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    dispatch(resetReviewSuccess());
  };

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        dispatch(resetReviewSuccess());
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
  }, [dispatch, isBackButtonFocused]);

  return (
    <div className="modal is-active modal--narrow" onClick={handleClick}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => {evt.stopPropagation();}}>
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
              onClick={handleClick} ref={backButton}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            onClick={handleClick} ref={closeButton}
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

export default ReviewSuccessModal;

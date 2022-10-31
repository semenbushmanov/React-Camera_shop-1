import { ChangeEvent, FormEvent, memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { postReviewAction } from '../../store/api-actions';

const MIN_COMMENT_LENGTH = 5;

type AddReviewModalProps = {
  cameraId: number;
  closeAddReviewModal: () => void;
};

function AddReviewModal({cameraId, closeAddReviewModal}: AddReviewModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [ rating, setRating ] = useState(0);
  const [ name, setName ] = useState('');
  const [ advantage, setAdvantage ] = useState('');
  const [ disadvantage, setDisadvantage ] = useState('');
  const [ comment, setComment ] = useState('');
  const [ isRatingInvalid, setRatingInvalid ] = useState(false);
  const [ isNameInvalid, setNameInvalid ] = useState(false);
  const [ isAdvantageInvalid, setAdvantageInvalid ] = useState(false);
  const [ isDisadvantageInvalid, setDisadvantageInvalid ] = useState(false);
  const [ isCommentInvalid, setCommentInvalid ] = useState(false);

  const firstFocusableElement = useRef<HTMLInputElement | null>(null);
  const lastFocusableElement = useRef<HTMLButtonElement | null>(null);

  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(target.value));
    setRatingInvalid(false);
  };

  const handleNameChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
    setNameInvalid(false);
  };

  const handleAdvantageChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setAdvantage(target.value);
    setAdvantageInvalid(false);
  };

  const handleDisadvantageChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(target.value);
    setDisadvantageInvalid(false);
  };

  const handleCommentChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
    setCommentInvalid(false);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (rating === 0 || !name || !advantage || !disadvantage || comment.length < MIN_COMMENT_LENGTH) {
      if (rating === 0) {
        setRatingInvalid(true);
      }

      if (!name) {
        setNameInvalid(true);
      }

      if (!advantage) {
        setAdvantageInvalid(true);
      }

      if (!disadvantage) {
        setDisadvantageInvalid(true);
      }

      if (comment.length < MIN_COMMENT_LENGTH) {
        setCommentInvalid(true);
      }

      return;
    }

    const reviewPost = {
      cameraId: cameraId,
      userName: name,
      rating: rating,
      advantage: advantage,
      disadvantage: disadvantage,
      review: comment,
    };

    dispatch(postReviewAction({review: reviewPost}));
  };

  useEffect(() => {
    let isTabPressedFirstTime = true;

    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeAddReviewModal();
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
  }, [closeAddReviewModal]);

  return (
    <div className="modal is-active" onClick={closeAddReviewModal}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content" onClick={(evt) => {evt.stopPropagation();}}>
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit}>
              <div className="form-review__rate">
                <fieldset className={isRatingInvalid ? 'rate form-review__item is-invalid' : 'rate form-review__item'}>
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5"
                        checked={rating === 5} onChange={handleRatingChange}
                        ref={firstFocusableElement}
                      />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4"
                        checked={rating === 4} onChange={handleRatingChange}
                      />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3"
                        checked={rating === 3} onChange={handleRatingChange}
                      />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2"
                        checked={rating === 2} onChange={handleRatingChange}
                      />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1"
                        checked={rating === 1} onChange={handleRatingChange}
                      />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{rating}</span>
                      <span>/</span>
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className={isNameInvalid ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}>
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-name" placeholder="Введите ваше имя"
                      value={name} onChange={handleNameChange}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать имя</p>
                </div>
                <div className={isAdvantageInvalid ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}>
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-plus" placeholder="Основные преимущества товара"
                      value={advantage} onChange={handleAdvantageChange}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={isDisadvantageInvalid ? 'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" name="user-minus" placeholder="Главные недостатки товара"
                      value={disadvantage} onChange={handleDisadvantageChange}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={isCommentInvalid ? 'custom-textarea form-review__item is-invalid' : 'custom-textarea form-review__item'}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea name="user-comment" placeholder="Поделитесь своим опытом покупки"
                      value={comment} onChange={handleCommentChange}
                    >
                    </textarea>
                  </label>
                  <div className="custom-textarea__error">Нужно добавить комментарий</div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап"
            onClick={closeAddReviewModal} ref={lastFocusableElement}
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

export default memo(AddReviewModal);

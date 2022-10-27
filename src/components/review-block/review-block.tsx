import ReviewCard from '../review-card/review-card';
import { Reviews } from '../../types/camera';
import { memo } from 'react';

type ReviewBlockProps = {
  reviews: Reviews;
  handleShowMoreButtonClick: () => void;
  shouldRenderShowMoreButton: boolean;
};

function ReviewBlock({reviews, handleShowMoreButtonClick, shouldRenderShowMoreButton}: ReviewBlockProps): JSX.Element {
  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviews.map((review) => <ReviewCard key={review.id} reviewData={review}/>)}
          </ul>
          {shouldRenderShowMoreButton &&
            <div className="review-block__buttons">
              <button className="btn btn--purple" type="button" onClick={handleShowMoreButtonClick}>
                Показать больше отзывов
              </button>
            </div>}
        </div>
      </section>
    </div>
  );
}

export default memo(ReviewBlock);

import RatingStars from '../rating-stars/rating-stars';
import { Review } from '../../types/camera';

type ReviewCardProps = {
  reviewData: Review;
};

function ReviewCard({reviewData}: ReviewCardProps): JSX.Element {
  const { userName, advantage, disadvantage, review, rating, createAt } = reviewData;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>{createAt}</time>
      </div>
      <RatingStars rating={rating} reviewCard/>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;

type RatingStarsProps = {
  rating: number;
  reviewCount?: number;
  reviewCard?: boolean;
};

const MAX_STARS_NUMBER = 5;

function RatingStars({rating, reviewCount, reviewCard}: RatingStarsProps): JSX.Element {
  const fullStars: JSX.Element[] = [];
  const stars: JSX.Element[] = [];

  for (let i = 0; i < rating; i++) {
    fullStars.push(
      <svg width="17" height="16" aria-hidden="true" key={i}>
        <use xlinkHref="#icon-full-star"></use>
      </svg>
    );
  }

  for (let i = 0; i < MAX_STARS_NUMBER - rating; i++) {
    stars.push(
      <svg width="17" height="16" aria-hidden="true" key={i}>
        <use xlinkHref="#icon-star"></use>
      </svg>
    );
  }

  return (
    <div className={reviewCard ? 'rate review-card__rate' : 'rate product__rate'}>
      {fullStars}
      {stars}
      {reviewCard ?
        <p className="visually-hidden">Оценка: {rating}</p>
        :
        <>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </>}
    </div>
  );
}

export default RatingStars;

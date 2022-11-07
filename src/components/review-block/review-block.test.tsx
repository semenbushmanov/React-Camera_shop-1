import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import ReviewBlock from './review-block';

const mockReviews = [ makeFakeReview(), makeFakeReview() ];
const mockShowMoreCb = jest.fn();
const mockOpenAddReviewCb = jest.fn();

describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    render(
      <ReviewBlock reviews={mockReviews} handleShowMoreButtonClick={mockShowMoreCb}
        shouldRenderShowMoreButton openAddReviewModal={mockOpenAddReviewCb}
      />);

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
    expect(screen.getByText('Показать больше отзывов')).toBeInTheDocument();
  });

  it('should show more reviews when user clicks the corresponding button', async () => {
    render(
      <ReviewBlock reviews={mockReviews} handleShowMoreButtonClick={mockShowMoreCb}
        shouldRenderShowMoreButton openAddReviewModal={mockOpenAddReviewCb}
      />);

    await userEvent.click(screen.getByText('Показать больше отзывов'));

    expect(mockShowMoreCb).toHaveBeenCalled();
  });

  it('should open modal to add review when user clicks the corresponding button', async () => {
    render(
      <ReviewBlock reviews={mockReviews} handleShowMoreButtonClick={mockShowMoreCb}
        shouldRenderShowMoreButton openAddReviewModal={mockOpenAddReviewCb}
      />);

    await userEvent.click(screen.getByText('Оставить свой отзыв'));

    expect(mockOpenAddReviewCb).toHaveBeenCalled();
  });
});

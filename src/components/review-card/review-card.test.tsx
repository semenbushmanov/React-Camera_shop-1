import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../utils/mocks';
import { formatReviewDate } from '../../utils/common';
import ReviewCard from './review-card';

const mockReview = makeFakeReview();
const mockFormattedReviewDate = formatReviewDate(mockReview.createAt);

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    render(<ReviewCard reviewData={mockReview}/>);

    expect(screen.getByText(mockReview.userName)).toBeInTheDocument();
    expect(screen.getByText(mockFormattedReviewDate)).toBeInTheDocument();
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText(mockReview.advantage)).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText(mockReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
    expect(screen.getByText(mockReview.review)).toBeInTheDocument();
  });
});

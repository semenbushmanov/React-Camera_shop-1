import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';

const mockRating = 3;
const mockReviewCount = 12;

describe('Component: RatingStars', () => {
  it('should render correctly', () => {
    render(<RatingStars rating={mockRating} reviewCount={mockReviewCount}/>);

    expect(screen.getByText(`Рейтинг: ${mockRating}`)).toBeInTheDocument();
    expect(screen.getByText(mockReviewCount)).toBeInTheDocument();
  });
});

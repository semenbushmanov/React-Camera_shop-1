import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import ProductCard from './product-card';

const history = createMemoryHistory();
const mockCamera = makeFakeCamera();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <ProductCard camera={mockCamera} isInBasket={false} openAddItemModal={jest.fn}/>
      </HistoryRouter>);

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});

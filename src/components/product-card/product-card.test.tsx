import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mocks';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import ProductCard from './product-card';

const history = createMemoryHistory();
const mockCamera = makeFakeCamera();
mockCamera.id = 1;

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

  it('should navigate to item screen when user clicks the button: details', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Item}/1`}
            element={<h1>This is item page</h1>}
          />
          <Route
            path='*'
            element={<ProductCard camera={mockCamera} isInBasket={false} openAddItemModal={jest.fn}/>}
          />
        </Routes>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Подробнее'));

    expect(screen.getByText(/This is item page/i)).toBeInTheDocument();
  });

  it('should openAddItemModal when user clicks the button: buy', async () => {
    const mockCallback = jest.fn();

    render(
      <HistoryRouter history={history}>
        <ProductCard camera={mockCamera} isInBasket={false} openAddItemModal={mockCallback}/>
      </HistoryRouter>);

    await userEvent.click(screen.getByText('Купить'));

    expect(mockCallback).toHaveBeenCalled();
  });
});

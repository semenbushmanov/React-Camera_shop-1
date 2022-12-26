import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import OrderSuccessModal from './order-success-modal';
import { Routes, Route } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockCallback = jest.fn();

const store = mockStore({
  BASKET: {
    basketItems: [],
    isAddSuccessModalOpen: false,
    isOrderSuccessModalOpen: false,
    isPosting: false,
    invalidCoupon: false,
    coupon: null,
    discount: 0,
  },
});

describe('Component: OrderSuccessModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OrderSuccessModal onClose={mockCallback}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('should dispatch resetBasket and call onClose callback when user clicks the close button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OrderSuccessModal onClose={mockCallback}/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    const actions = store.getActions();

    expect(mockCallback).toHaveBeenCalled();
    expect(actions[0].type).toBe('BASKET/resetBasket');
  });

  it('should navigate to catalog when user clicks the button: back to shopping', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<OrderSuccessModal onClose={mockCallback}/>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText('Вернуться к покупкам'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});

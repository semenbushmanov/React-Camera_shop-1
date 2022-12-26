import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const';
import AddSuccessModal from './add-success-modal';
import { Routes, Route } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();

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

describe('Component: AddSuccessModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddSuccessModal />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
  });

  it('should dispatch closeAddSuccessModal when user clicks the close button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddSuccessModal />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/closeAddSuccessModal');
  });

  it('should dispatch closeAddSuccessModal and navigate to catalog when user clicks the button: back to shopping', async () => {
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
              element={<AddSuccessModal />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText('Продолжить покупки'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/closeAddSuccessModal');
    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });

  it('should dispatch closeAddSuccessModal and navigate to basket when user clicks the button: go to basket', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Basket}
              element={<h1>This is basket</h1>}
            />
            <Route
              path='*'
              element={<AddSuccessModal />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText('Перейти в корзину'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/closeAddSuccessModal');
    expect(screen.getByText(/This is basket/i)).toBeInTheDocument();
  });
});

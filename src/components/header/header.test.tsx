import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Promo } from '../../types/camera';
import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const itemsQuantity = 3;

const store = mockStore({
  BASKET: {
    basketItems: [{id: 1, quantity: itemsQuantity}],
    isAddSuccessModalOpen: false,
  },
  DATA: {
    originalCameras: [],
    isInitialLoading: false,
    cameras: [],
    isDataLoading:false,
    promo: {} as Promo,
    isPromoLoading: false,
    isPosting: false,
    reviewSuccess: false,
  },
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Header />
        </Provider>
      </HistoryRouter>);

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicks the link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={<h1>This is main page</h1>}
            />
            <Route
              path='*'
              element={<Header />}
            />
          </Routes>
        </Provider>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Каталог'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });

  it('should render number of items in the basket', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Header />
        </Provider>
      </HistoryRouter>);

    expect(screen.getByText(itemsQuantity)).toBeInTheDocument();
  });
});

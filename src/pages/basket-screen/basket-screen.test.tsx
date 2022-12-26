import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';
import { formatPrice } from '../../utils/common';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import BasketScreen from './basket-screen';

const mockStore = configureMockStore([thunk]);
const mockCameraOne = makeFakeCamera();
const mockCameraTwo = makeFakeCamera();
const mockCameras = [ mockCameraOne, mockCameraTwo ];
const mockPromo = makeFakePromo();
const history = createMemoryHistory();
window.scrollTo = jest.fn();

const store = mockStore({
  BASKET: {
    basketItems: [{id: mockCameraOne.id, quantity: 2}],
    isAddSuccessModalOpen: false,
    isOrderSuccessModalOpen: false,
    isPosting: false,
    invalidCoupon: false,
    coupon: null,
    discount: 0,
  },
  DATA: {
    originalCameras: mockCameras,
    isInitialLoading: false,
    cameras: mockCameras,
    isDataLoading:false,
    promo: mockPromo,
    isPromoLoading: false,
    isPosting: false,
    reviewSuccess: false,
  },
});

describe('Component: Catalog', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <BasketScreen />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getAllByText('Корзина')[0]).toBeInTheDocument();
    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
    expect(screen.getByText(mockCameraOne.name)).toBeInTheDocument();
    expect(screen.getByText(`${formatPrice(mockCameraOne.price)} ₽`)).toBeInTheDocument();
  });

  it('should dispatch postOrder after clicking order submit button', async () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <BasketScreen />
        </Provider>
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Оформить заказ'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/postOrder/pending');
  });
});

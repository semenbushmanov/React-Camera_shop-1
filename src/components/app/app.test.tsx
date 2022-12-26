import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import { AppRoute, APIRoute } from '../../const';
import { Promo } from '../../types/camera';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../services/api';
import { makeFakeCamera, makeFakeReview } from '../../utils/mocks';
import thunk from 'redux-thunk';
import App from './app';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const mockAPI = new MockAdapter(api);
window.scrollTo = jest.fn();

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

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render "Catalog" when user navigates to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "Catalog" when user navigates to "/catalog/1"', () => {
    history.push(`${AppRoute.Catalog}/1`);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "Item" when user navigates to "/item/1"', async () => {
    const mockCamera = makeFakeCamera();
    const mockSimilarCameras = [ makeFakeCamera() ];
    const mockReviews = [ makeFakeReview() ];

    mockAPI
      .onGet(`${APIRoute.Cameras}/1`)
      .reply(200, mockCamera);

    mockAPI
      .onGet(`${APIRoute.Cameras}/1/similar`)
      .reply(200, mockSimilarCameras);

    mockAPI
      .onGet(`${APIRoute.Cameras}/1/reviews`)
      .reply(200, mockReviews);

    history.push(`${AppRoute.Item}/1`);

    render(fakeApp);

    await waitFor(() => {
      expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    });
  });

  it('should render "Basket" when user navigates to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });

  it('should render "OrderFailScreen" when user is redirected to "/fail"', () => {
    history.push(AppRoute.OrderFail);

    render(fakeApp);

    expect(screen.getByText('Ошибка при отправке заказа')).toBeInTheDocument();
    expect(screen.getByText('Назад на главную страницу')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigates to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Назад на главную страницу')).toBeInTheDocument();
  });
});

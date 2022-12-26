import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../utils/mocks';
import { formatPrice } from '../../utils/common';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Promo } from '../../types/camera';
import userEvent from '@testing-library/user-event';
import BasketCard from './basket-card';

const mockStore = configureMockStore();
const mockCamera = makeFakeCamera();
const fakeQuantity = 77;
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

describe('Component: BasketCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BasketCard camera={mockCamera} quantity={fakeQuantity} removeItem={mockCallback} />
      </Provider>);

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${formatPrice(mockCamera.price)} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${formatPrice(mockCamera.price * fakeQuantity)} ₽`)).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
  });

  it('should dispatch incrementQuantity when user clicks the corresponding button', async () => {
    render(
      <Provider store={store}>
        <BasketCard camera={mockCamera} quantity={fakeQuantity} removeItem={mockCallback} />
      </Provider>);

    await userEvent.click(screen.getByLabelText('увеличить количество товара'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/incrementQuantity');
  });

  it('should call remove callback when user clicks the corresponding button', async () => {
    render(
      <Provider store={store}>
        <BasketCard camera={mockCamera} quantity={fakeQuantity} removeItem={mockCallback} />
      </Provider>);

    await userEvent.click(screen.getByLabelText('Удалить товар'));

    expect(mockCallback).toHaveBeenCalled();
  });
});

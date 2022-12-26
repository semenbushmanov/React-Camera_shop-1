import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import AddItemModal from './add-item-modal';
import { makeFakeCamera } from '../../utils/mocks';
import { formatPrice } from '../../utils/common';

const mockStore = configureMockStore();
const mockCamera = makeFakeCamera();

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


describe('Component: AddItemModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <AddItemModal camera={mockCamera} closeModal={jest.fn()}/>
      </Provider>
    );

    const formattedPrice = `${formatPrice(mockCamera.price)} ₽`;

    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(formattedPrice)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
  });

  it('should add item to basket when user clicks the corresponding button', async () => {
    const mockCallback = jest.fn();

    render(
      <Provider store={store}>
        <AddItemModal camera={mockCamera} closeModal={mockCallback}/>
      </Provider>
    );

    await userEvent.click(screen.getByText('Добавить в корзину'));

    expect(mockCallback).toHaveBeenCalled();

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/addItem');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import RemoveItemModal from './remove-item-modal';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockCamera = makeFakeCamera();
const mockCloseModal = jest.fn();

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

describe('Component: RemoveItemModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RemoveItemModal camera={mockCamera} closeModal={mockCloseModal}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText('Удалить')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.level} уровень`)).toBeInTheDocument();
  });

  it('should dispatch removeItem and close modal when user clicks the remove button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RemoveItemModal camera={mockCamera} closeModal={mockCloseModal}/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText('Удалить'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('BASKET/removeItem');
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('should close modal when user clicks the close button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RemoveItemModal camera={mockCamera} closeModal={mockCloseModal}/>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByLabelText('Закрыть попап'));

    expect(mockCloseModal).toHaveBeenCalled();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Promo } from '../../types/camera';
import ReviewSuccessModal from './review-success-modal';

const mockStore = configureMockStore();

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


describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ReviewSuccessModal />
      </Provider>
    );

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('should be closed by resetting reviewSuccess flag in store when user clicks', async () => {
    render(
      <Provider store={store}>
        <ReviewSuccessModal />
      </Provider>
    );

    await userEvent.click(screen.getByText('Вернуться к покупкам'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('DATA/resetReviewSuccess');
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import AddReviewModal from './add-review-modal';
import { Promo } from '../../types/camera';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    cameras: [],
    isDataLoading:false,
    promo: {} as Promo,
    isPosting: false,
    reviewSuccess: false,
  },
});


describe('Component: AddReviewModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <AddReviewModal cameraId={2} closeModal={jest.fn()}/>
      </Provider>
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.getByText('Недостатки')).toBeInTheDocument();
    expect(screen.getByText('Комментарий')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });

  it('should close modal when user clicks the corresponding button', async () => {
    const mockCallback = jest.fn();

    render(
      <Provider store={store}>
        <AddReviewModal cameraId={2} closeModal={mockCallback}/>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Закрыть попап' }));

    expect(mockCallback).toHaveBeenCalled();
  });
});

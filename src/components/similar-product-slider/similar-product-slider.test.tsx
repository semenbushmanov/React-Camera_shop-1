import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Promo } from '../../types/camera';
import HistoryRouter from '../../components/history-route/history-route';
import SimilarProductSlider from './similar-product-slider';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockCameras = [ makeFakeCamera(), makeFakeCamera() ];

const store = mockStore({
  BASKET: {
    basketItems: [],
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

describe('Component: SimilarProductSlider', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <SimilarProductSlider similarCameras={mockCameras} openAddItemModal={jest.fn()}/>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });
});

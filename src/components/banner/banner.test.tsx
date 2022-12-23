import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakePromo } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Banner from './banner';

const mockStore = configureMockStore();
const mockPromo = makeFakePromo();
const history = createMemoryHistory();

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
    promo: mockPromo,
    isPromoLoading: false,
    isPosting: false,
    reviewSuccess: false,
  },
});

describe('Component: Banner', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Banner/>
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText(mockPromo.name)).toBeInTheDocument();
    expect(screen.getByText('Новинка!')).toBeInTheDocument();
  });
});

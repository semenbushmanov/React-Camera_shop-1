import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogScreen from './catalog-screen';

const mockStore = configureMockStore([thunk]);
const mockCameras = [ makeFakeCamera(), makeFakeCamera() ];
const mockPromo = makeFakePromo();
const history = createMemoryHistory();

const store = mockStore({
  BASKET: {camerasIDs: []},
  DATA: {
    originalCameras: mockCameras,
    isInitialLoading: false,
    cameras: mockCameras,
    isDataLoading: false,
    promo: mockPromo,
    isPromoLoading: false,
    isPosting: false,
    reviewSuccess: false,
  },
});

describe('Component: Catalog', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <CatalogScreen />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });
});

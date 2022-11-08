import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakeReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { APIRoute } from '../../const';
import { Promo } from '../../types/camera';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/common';
import MockAdapter from 'axios-mock-adapter';
import HistoryRouter from '../../components/history-route/history-route';
import * as ReactRouterDom from 'react-router-dom';
import Item from './item';

interface mockedReactRouterDomType extends Omit<typeof ReactRouterDom, 'useParams'> {
  useParams: () => {
    id: string;
  };
}

jest.mock<mockedReactRouterDomType>('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1'
  })
}));

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockAPI = new MockAdapter(api);

const store = mockStore({
  BASKET: {camerasIDs: []},
  DATA: {
    cameras: [],
    isDataLoading:false,
    promo: {} as Promo,
    isPosting: false,
    reviewSuccess: false,
  },
});

describe('Component: Item', () => {
  it('should render correctly', async () => {
    const mockCamera = makeFakeCamera();
    const mockSimilarCameras = [ makeFakeCamera() ];
    const mockReviews = [ makeFakeReview() ];
    const formattedPrice = formatPrice(mockCamera.price);

    mockAPI
      .onGet(`${APIRoute.Cameras}/1`)
      .reply(200, mockCamera);

    mockAPI
      .onGet(`${APIRoute.Cameras}/1/similar`)
      .reply(200, mockSimilarCameras);

    mockAPI
      .onGet(`${APIRoute.Cameras}/1/reviews`)
      .reply(200, mockReviews);

    render(
      <HistoryRouter history={history}>
        <Provider store={store}>
          <Item />
        </Provider>
      </HistoryRouter>
    );

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(mockCamera.name)[0]).toBeInTheDocument();
    });

    expect(screen.getAllByText('Цена:')[0]).toBeInTheDocument();
    expect(screen.getByText(`${formattedPrice} ₽`)).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { makeFakeCamera } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import SimilarProductSlider from './similar-product-slider';

const history = createMemoryHistory();
const mockCameras = [ makeFakeCamera(), makeFakeCamera() ];

describe('Component: SimilarProductSlider', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <SimilarProductSlider similarCameras={mockCameras} openAddItemModal={jest.fn()}/>
      </HistoryRouter>
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });
});

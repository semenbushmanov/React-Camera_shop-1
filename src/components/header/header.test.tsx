import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>);

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicks the link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<Header />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Каталог'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });

  it('should render number of items in the basket', () => {
    const itemsNumber = 3;

    render(
      <HistoryRouter history={history}>
        <Header basketItemsCount={itemsNumber}/>
      </HistoryRouter>);

    expect(screen.getByText(itemsNumber)).toBeInTheDocument();
  });
});

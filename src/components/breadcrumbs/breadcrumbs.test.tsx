import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import BreadCrumbs from './breadcrumbs';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: BreadCrumbs', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <BreadCrumbs item={'Cannon'}/>
      </HistoryRouter>);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Cannon')).toBeInTheDocument();
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
            element={<BreadCrumbs item={'Cannon'}/>}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Главная'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});

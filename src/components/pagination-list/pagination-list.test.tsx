import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import PaginationList from './pagination-list';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const totalPagesNumber = 3;
const middlePageNumber = 2;

describe('Component: PaginationList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <PaginationList pagesTotal={totalPagesNumber} currentPage={middlePageNumber}
          sortCategoryParams={null} sortOrderParams={null}
        />
      </HistoryRouter>);

    expect(screen.getByText('Назад')).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
    expect(screen.getByText(middlePageNumber)).toBeInTheDocument();
  });

  it('should redirect to the next page when user clicks the next button', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Catalog}/3`}
            element={<h1>This is next page</h1>}
          />
          <Route
            path='*'
            element={
              <PaginationList pagesTotal={totalPagesNumber} currentPage={middlePageNumber}
                sortCategoryParams={null} sortOrderParams={null}
              />
            }
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is next page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Далее'));

    expect(screen.getByText(/This is next page/i)).toBeInTheDocument();
  });

  it('should redirect to the previous page when user clicks the back button', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Catalog}/1`}
            element={<h1>This is previous page</h1>}
          />
          <Route
            path='*'
            element={
              <PaginationList pagesTotal={totalPagesNumber} currentPage={middlePageNumber}
                sortCategoryParams={null} sortOrderParams={null}
              />
            }
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is previous page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Назад'));

    expect(screen.getByText(/This is previous page/i)).toBeInTheDocument();
  });
});

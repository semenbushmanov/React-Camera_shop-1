import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import OrderFailScreen from './order-fail-screen';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: OrderFailScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <OrderFailScreen />
      </HistoryRouter>);

    expect(screen.getByText('Ошибка при отправке заказа')).toBeInTheDocument();
    expect(screen.getByText('Побробуйте отправить заказ позже')).toBeInTheDocument();
    expect(screen.getByText('Назад на главную страницу')).toBeInTheDocument();
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
            element={<OrderFailScreen />}
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});

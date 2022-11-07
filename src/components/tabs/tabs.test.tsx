import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AppRoute, Tab } from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Tabs from './tabs';

const history = createMemoryHistory();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    history.push(`${AppRoute.Item}/1/${Tab.Description}`);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Item}/1/${Tab.Description}`}
            element={
              <Tabs id='1' vendorCode='fakeCode' category='fakeCategory' type='fakeType'
                level='fakeLevel' description='fakeDescription'
              />
            }
          />
        </Routes>
      </HistoryRouter>);

    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('fakeDescription')).toBeInTheDocument();
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('fakeCode')).toBeInTheDocument();
    expect(screen.getByText('Категория:')).toBeInTheDocument();
    expect(screen.getByText('fakeCategory')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры:')).toBeInTheDocument();
    expect(screen.getByText('fakeType')).toBeInTheDocument();
    expect(screen.getByText('Уровень:')).toBeInTheDocument();
    expect(screen.getByText('fakeLevel')).toBeInTheDocument();
  });
});

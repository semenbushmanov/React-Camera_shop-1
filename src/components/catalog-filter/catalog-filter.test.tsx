import { render, screen } from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <CatalogFilter
        minPrice={''}
        maxPrice={''}
        isPhotocamera={false}
        isVideoCamera={false}
        isDigital={false}
        isFilm={false}
        isSnapshot={false}
        isCollection={false}
        isNovice={false}
        isAmateur={false}
        isPro={false}
        onPriceChange={jest.fn()}
        onFilterChange={jest.fn()}
        onFilterReset={jest.fn()}
      />);

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });
});

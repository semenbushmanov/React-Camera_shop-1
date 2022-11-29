import { render, screen } from '@testing-library/react';
import CatalogSorter from './catalog-sorter';

describe('Component: CatalogSorter', () => {
  it('should render correctly', () => {
    render(
      <CatalogSorter
        onSortCategoryChange={jest.fn}
        onSortOrderChange={jest.fn}
        sortCategory='price'
        sortOrder='asc'
      />
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});

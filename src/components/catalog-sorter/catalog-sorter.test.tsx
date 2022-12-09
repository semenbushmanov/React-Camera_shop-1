import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogSorter from './catalog-sorter';

describe.only('Component: CatalogSorter', () => {
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
    expect(screen.getByRole('radio', { name: 'по цене' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'По возрастанию' })).toBeChecked();
  });

  it('should call onSortCategoryChange when user choose sorting by price', async () => {
    const onSortCategoryChange = jest.fn();
    render(
      <CatalogSorter
        onSortCategoryChange={onSortCategoryChange}
        onSortOrderChange={jest.fn}
        sortCategory={null}
        sortOrder={null}
      />
    );

    await userEvent.click(screen.getByRole('radio', { name: 'по цене' }));

    expect(onSortCategoryChange).toBeCalled();
  });

  it('should call onSortOrderChange when user choose sorting by order', async () => {
    const onSortOrderChange = jest.fn();
    render(
      <CatalogSorter
        onSortCategoryChange={jest.fn()}
        onSortOrderChange={onSortOrderChange}
        sortCategory={null}
        sortOrder={null}
      />
    );

    await userEvent.click(screen.getByRole('radio', { name: 'По возрастанию' }));

    expect(onSortOrderChange).toBeCalled();
  });
});

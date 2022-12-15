import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogFilter from './catalog-filter';
import { ToastContainer } from 'react-toastify';

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <CatalogFilter
        minPrice={'50'}
        maxPrice={'100'}
        sortedPrices={[0, 1]}
        isPhotocamera
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

    const priceInputs = screen.getAllByRole('spinbutton');
    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Уровень')).toBeInTheDocument();
    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    expect(priceInputs[0]).toHaveValue(50);
    expect(priceInputs[1]).toHaveValue(100);
    expect(screen.getByRole('checkbox', { name: 'Фотокамера' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Видеокамера' })).not.toBeChecked();
  });

  it('should call onFilterChange when user clicks filter checkbox', async () => {
    const onFilterChange = jest.fn();

    render(
      <CatalogFilter
        minPrice={'50'}
        maxPrice={'100'}
        sortedPrices={[0, 1]}
        isPhotocamera
        isVideoCamera={false}
        isDigital={false}
        isFilm={false}
        isSnapshot={false}
        isCollection={false}
        isNovice={false}
        isAmateur={false}
        isPro={false}
        onPriceChange={jest.fn()}
        onFilterChange={onFilterChange}
        onFilterReset={jest.fn()}
      />);

    await userEvent.click(screen.getByText('Фотокамера'));

    expect(onFilterChange).toBeCalled();
  });

  it('should warn user if user inputs negative number', async () => {
    const onPriceChange = jest.fn();

    render(
      <>
        <ToastContainer />
        <CatalogFilter
          minPrice={''}
          maxPrice={''}
          sortedPrices={[0, 1]}
          isPhotocamera
          isVideoCamera={false}
          isDigital={false}
          isFilm={false}
          isSnapshot={false}
          isCollection={false}
          isNovice={false}
          isAmateur={false}
          isPro={false}
          onPriceChange={onPriceChange}
          onFilterChange={jest.fn()}
          onFilterReset={jest.fn()}
        />
      </>);

    const priceInputs = screen.getAllByRole('spinbutton');
    await userEvent.type(priceInputs[0], '-1' );

    expect(await screen.findByText('Можно ввести только положительное число')).toBeInTheDocument();
    expect(onPriceChange).not.toBeCalled();
  });

  it('should warn user if min price is greater than max price', async () => {
    const onPriceChange = jest.fn();

    render(
      <>
        <ToastContainer />
        <CatalogFilter
          minPrice={'100'}
          maxPrice={''}
          sortedPrices={[0, 1]}
          isPhotocamera
          isVideoCamera={false}
          isDigital={false}
          isFilm={false}
          isSnapshot={false}
          isCollection={false}
          isNovice={false}
          isAmateur={false}
          isPro={false}
          onPriceChange={onPriceChange}
          onFilterChange={jest.fn()}
          onFilterReset={jest.fn()}
        />
      </>);

    const priceInputs = screen.getAllByRole('spinbutton');

    await userEvent.type(priceInputs[1], '50' );
    fireEvent.keyDown(priceInputs[0], {key: 'Enter', code: 'Enter', charCode: 13});

    expect(await screen.findByText('Максимальная цена товара не должна быть меньше минимальной')).toBeInTheDocument();
    expect(onPriceChange).not.toBeCalled();
  });

  it('should call onPriceChange if price is valid', async () => {
    const onPriceChange = jest.fn();

    render(
      <CatalogFilter
        minPrice={''}
        maxPrice={''}
        sortedPrices={[0, 1]}
        isPhotocamera
        isVideoCamera={false}
        isDigital={false}
        isFilm={false}
        isSnapshot={false}
        isCollection={false}
        isNovice={false}
        isAmateur={false}
        isPro={false}
        onPriceChange={onPriceChange}
        onFilterChange={jest.fn()}
        onFilterReset={jest.fn()}
      />);

    const priceInputs = screen.getAllByRole('spinbutton');

    await userEvent.type(priceInputs[0], '50' );
    await userEvent.type(priceInputs[1], '100' );
    fireEvent.keyDown(priceInputs[0], {key: 'Enter', code: 'Enter', charCode: 13});

    expect(onPriceChange).toBeCalled();
  });
});

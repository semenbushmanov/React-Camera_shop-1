import { useState, ChangeEvent, KeyboardEvent, memo } from 'react';
import { CameraCategory, CameraType, CameraLevel } from '../../const';
import { toast } from 'react-toastify';

type CatalogFilterProps = {
  minPrice: string;
  maxPrice: string;
  minCatalogPrice: string;
  maxCatalogPrice: string;
  isPhotocamera: boolean;
  isVideoCamera: boolean;
  isDigital: boolean;
  isFilm: boolean;
  isSnapshot: boolean;
  isCollection: boolean;
  isNovice: boolean;
  isAmateur: boolean;
  isPro: boolean;
  onPriceChange: (minPriceInput: string, maxPriceInput: string) => void;
  onFilterChange: ({target}: ChangeEvent<HTMLInputElement>) => void;
  onFilterReset: () => void;
};

function CatalogFilter(props: CatalogFilterProps): JSX.Element {
  const { minPrice, maxPrice, minCatalogPrice, maxCatalogPrice, isPhotocamera, isVideoCamera,
    isDigital, isFilm, isSnapshot, isCollection, isNovice, isAmateur, isPro,
    onPriceChange, onFilterChange, onFilterReset } = props;

  const [ minPriceInput, setMinPriceInput ] = useState(minPrice);
  const [ maxPriceInput, setMaxPriceInput ] = useState(maxPrice);

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();

      onPriceChange(minPriceInput, maxPriceInput);
    }
  };

  const handlePriceChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (Number(target.value) >= 0) {
      if (target.name === 'price') {
        setMinPriceInput(target.value);

        return;
      }

      setMaxPriceInput(target.value);
      return;
    }

    toast.warn('Можно ввести только положительное число');
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder={minCatalogPrice} value={minPriceInput}
                    onChange={handlePriceChange} onKeyDown={handleKeyDown}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder={maxCatalogPrice} value={maxPriceInput}
                    onChange={handlePriceChange} onKeyDown={handleKeyDown}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="photocamera" checked={isPhotocamera}
                  value={CameraCategory.Photo} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera" checked={isVideoCamera}
                  value={CameraCategory.Video} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital" checked={isDigital}
                  value={CameraType.Digital} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film" disabled={isVideoCamera && !isPhotocamera} checked={isFilm}
                  value={CameraType.Film} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot" disabled={isVideoCamera && !isPhotocamera}
                  checked={isSnapshot} value={CameraType.Snapshot} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection" checked={isCollection}
                  value={CameraType.Collection} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero" checked={isNovice}
                  value={CameraLevel.Novice} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional" checked={isAmateur}
                  value={CameraLevel.Amateur} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional" checked={isPro}
                  value={CameraLevel.Pro} onChange={onFilterChange}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset" onClick={onFilterReset}>
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default memo(CatalogFilter);

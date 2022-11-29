import { ChangeEvent, memo } from 'react';
import { SortCategory, SortOrder } from '../../const';

type CatalogSorterProps = {
  onSortCategoryChange: ({target}: ChangeEvent<HTMLInputElement>) => void;
  onSortOrderChange: ({target}: ChangeEvent<HTMLInputElement>) => void;
  sortCategory: string | null;
  sortOrder: string | null;
};

function CatalogSorter(props: CatalogSorterProps): JSX.Element {
  const { onSortCategoryChange, onSortOrderChange, sortCategory, sortOrder } = props;

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" value={SortCategory.Price}
                checked={sortCategory === SortCategory.Price} onChange={onSortCategoryChange}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" value={SortCategory.Rating}
                checked={sortCategory === SortCategory.Rating} onChange={onSortCategoryChange}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию"
                value={SortOrder.Asc} checked={sortOrder === SortOrder.Asc} onChange={onSortOrderChange}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"
                value={SortOrder.Desc} checked={sortOrder === SortOrder.Desc} onChange={onSortOrderChange}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default memo(CatalogSorter);

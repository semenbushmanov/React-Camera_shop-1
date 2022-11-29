import { Link } from 'react-router-dom';
import { AppRoute, Settings, QueryParams } from '../../const';

type PaginationListProps = {
  pagesTotal: number;
  currentPage: number;
  sortCategoryParams: string | null;
  sortOrderParams: string | null;
};

const INDEX_TO_PAGE_DIFFERENCE = 1;

function PaginationList(props: PaginationListProps): JSX.Element {
  const { pagesTotal, currentPage, sortCategoryParams, sortOrderParams } = props;
  const searchParams = sortCategoryParams && sortOrderParams ?
    `?${QueryParams.Sort}=${sortCategoryParams}&${QueryParams.Order}=${sortOrderParams}` : '';

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > Settings.InitialPageNumber &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={{ pathname: `${AppRoute.Catalog}/${currentPage - Settings.PaginationStep}`,
                search: searchParams }}
            >Назад
            </Link>
          </li>}
        {Array.from(Array(pagesTotal).keys()).map((pageIndex) => (
          <li className="pagination__item" key={pageIndex}>
            <Link
              className={pageIndex + INDEX_TO_PAGE_DIFFERENCE === currentPage ?
                'pagination__link pagination__link--active'
                : 'pagination__link'}
              to={{ pathname: `${AppRoute.Catalog}/${pageIndex + INDEX_TO_PAGE_DIFFERENCE}`,
                search: searchParams }}
            >
              {pageIndex + INDEX_TO_PAGE_DIFFERENCE}
            </Link>
          </li>
        ))}
        {currentPage < pagesTotal &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={{ pathname: `${AppRoute.Catalog}/${currentPage + Settings.PaginationStep}`,
                search: searchParams }}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default PaginationList;

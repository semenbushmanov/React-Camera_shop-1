import { Link } from 'react-router-dom';
import { AppRoute, Settings } from '../../const';

type PaginationListProps = {
  pagesTotal: number;
  currentPage: number;
};

const INDEX_TO_PAGE_DIFFERENCE = 1;

function PaginationList({pagesTotal, currentPage}: PaginationListProps): JSX.Element {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > Settings.InitialPageNumber &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/${currentPage - Settings.PaginationStep}`}
            >Назад
            </Link>
          </li>}
        {Array.from(Array(pagesTotal).keys()).map((pageIndex) => (
          <li className="pagination__item" key={pageIndex}>
            <Link
              className={pageIndex + INDEX_TO_PAGE_DIFFERENCE === currentPage ?
                'pagination__link pagination__link--active'
                : 'pagination__link'}
              to={`${AppRoute.Catalog}/${pageIndex + INDEX_TO_PAGE_DIFFERENCE}`}
            >
              {pageIndex + INDEX_TO_PAGE_DIFFERENCE}
            </Link>
          </li>
        ))}
        {currentPage < pagesTotal &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/${currentPage + Settings.PaginationStep}`}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default PaginationList;

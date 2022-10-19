import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type PaginationListProps = {
  pagesTotal: number;
  currentPage: number;
};

function PaginationList({pagesTotal, currentPage}: PaginationListProps): JSX.Element {
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1 &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/${currentPage - 1}`}
            >Назад
            </Link>
          </li>}
        {Array.from(Array(pagesTotal).keys()).map((page) => (
          <li className="pagination__item" key={page}>
            <Link
              className={page + 1 === currentPage ?
                'pagination__link pagination__link--active'
                : 'pagination__link'}
              to={`${AppRoute.Catalog}/${page + 1}`}
            >
              {page + 1}
            </Link>
          </li>
        ))}
        {currentPage < pagesTotal &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/${currentPage + 1}`}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default PaginationList;

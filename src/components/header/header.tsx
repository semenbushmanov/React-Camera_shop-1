import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState, ChangeEvent, useEffect, useCallback } from 'react';
import { useFetchCameraSearch } from '../../hooks/api-hooks/use-fetch-camera-search';
import FormSearchList from '../form-search-list/form-search-list';

type HeaderProps = {
  basketItemsCount?: number;
};

function Header({basketItemsCount}: HeaderProps): JSX.Element {
  const navigate = useNavigate();
  const isBasketCountVisible = basketItemsCount ? basketItemsCount !== 0 : false;
  const [ isSearchListOpen, setSearchListOpen ] = useState(false);
  const [ searchInput, setSearchInput ] = useState('');
  const [ cameras ] = useFetchCameraSearch(searchInput);

  useEffect(() => {
    if (!searchInput) {
      setSearchListOpen(false);
    }
  }, [searchInput]);

  const handleSearchChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(target.value);
    setSearchListOpen(true);
  };

  const resetSearch = () => {
    setSearchInput('');
  };

  const onItemClick = useCallback(
    (id: number) => {
      resetSearch();
      navigate(`${AppRoute.Item}/${id}`);
    }, [navigate]
  );

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to=''>Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to=''>Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to=''>О компании</Link>
            </li>
          </ul>
        </nav>
        <div className={isSearchListOpen ? 'form-search list-opened' : 'form-search'}>
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" onChange={handleSearchChange} value={searchInput}/>
            </label>
            <FormSearchList cameras={cameras} onItemClick={onItemClick}/>
          </form>
          <button className="form-search__reset" type="reset" onClick={resetSearch}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg><span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>{isBasketCountVisible && <span className="header__basket-count">{basketItemsCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSorter from '../../components/catalog-sorter/catalog-sorter';
import PaginationList from '../../components/pagination-list/pagination-list';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AppRoute, Settings, QueryParams, SortCategory, SortOrder } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { getCameras, getDataLoadingStatus, getPromoLoadingStatus } from '../../store/cameras-data/selectors';
import { Camera } from '../../types/camera';

function CatalogScreen(): JSX.Element {
  const { page } = useParams();
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);
  const isLoading = useAppSelector(getDataLoadingStatus);
  const isPromoLoading = useAppSelector(getPromoLoadingStatus);
  const pagesTotal = Math.ceil(cameras.length / Settings.CardsOnPageNumber);
  const currentPage = page ? Number(page) : Settings.InitialPageNumber;
  const [ isAddItemModalOpen, setAddItemModalOpen ] = useState(false);
  const [ currentCamera, setCurrentCamera ] = useState({} as Camera);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const sortCategoryParams = searchParams.get(QueryParams.Sort);
  const sortOrderParams = searchParams.get(QueryParams.Order);

  useEffect(() => {
    if (sortCategoryParams === null && sortOrderParams === null) {
      dispatch(fetchCamerasAction({params: undefined}));
    } else {
      if ((sortCategoryParams === SortCategory.Price || sortCategoryParams === SortCategory.Rating)
        && (sortOrderParams === SortOrder.Asc || sortOrderParams === SortOrder.Desc)) {
        dispatch(fetchCamerasAction({params: {
          [QueryParams.Sort]: sortCategoryParams,
          [QueryParams.Order]: sortOrderParams,
        }}));
      }
    }
  }, [dispatch, sortCategoryParams, sortOrderParams]);

  const onSortCategoryChange = useCallback(
    ({target}: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({
        [QueryParams.Sort]: target.value,
        [QueryParams.Order]: sortOrderParams ?? SortOrder.Asc,
      });
    }, [setSearchParams, sortOrderParams]
  );

  const onSortOrderChange = useCallback(
    ({target}: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({
        [QueryParams.Sort]: sortCategoryParams ?? SortCategory.Price,
        [QueryParams.Order]: target.value,
      });
    }, [setSearchParams, sortCategoryParams]
  );

  const openAddItemModal = useCallback(
    (camera: Camera) => {
      setCurrentCamera(camera);
      setAddItemModalOpen(true);
    }, []
  );

  const closeAddItemModal = useCallback(
    () => {
      setAddItemModalOpen(false);
    }, []
  );

  if (isLoading || isPromoLoading) {
    return (<LoadingScreen />);
  }

  if (pagesTotal) {
    if (currentPage > pagesTotal || currentPage < Settings.InitialPageNumber || isNaN(currentPage)) {
      return (
        <NotFoundScreen />
      );
    }
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogFilter />
                <div className="catalog__content">
                  <CatalogSorter
                    onSortCategoryChange={onSortCategoryChange}
                    onSortOrderChange={onSortOrderChange}
                    sortCategory={sortCategoryParams}
                    sortOrder={sortOrderParams}
                  />
                  <ProductCardsList
                    cameras={cameras}
                    currentPage={currentPage}
                    openAddItemModal={openAddItemModal}
                  />
                  <PaginationList pagesTotal={pagesTotal} currentPage={currentPage}
                    sortCategoryParams={sortCategoryParams} sortOrderParams={sortOrderParams}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        {isAddItemModalOpen && <AddItemModal camera={currentCamera} closeAddItemModal={closeAddItemModal}/>}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

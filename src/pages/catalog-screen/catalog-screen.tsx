import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSorter from '../../components/catalog-sorter/catalog-sorter';
import PaginationList from '../../components/pagination-list/pagination-list';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import AddSuccessModal from '../../components/add-success-modal/add-success-modal';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { AppRoute, Settings, QueryParams, SortCategory, SortOrder,
  CameraCategory, CameraType, CameraLevel } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCamerasAction } from '../../store/api-actions';
import { getOriginalCameras, getCameras, getDataLoadingStatus, getInitialLoadingStatus,
  getPromoLoadingStatus } from '../../store/cameras-data/selectors';
import { getAddSuccessModalStatus } from '../../store/basket/selectors';
import { Camera } from '../../types/camera';
import { getSortedPrices } from '../../utils/common';

function CatalogScreen(): JSX.Element {
  const { page } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const originalCameras = useAppSelector(getOriginalCameras);
  const cameras = useAppSelector(getCameras);
  const isInitialLoading = useAppSelector(getInitialLoadingStatus);
  const isLoading = useAppSelector(getDataLoadingStatus);
  const isPromoLoading = useAppSelector(getPromoLoadingStatus);
  const isAddSuccessModalOpen = useAppSelector(getAddSuccessModalStatus);
  const pagesTotal = Math.ceil(cameras.length / Settings.CardsOnPageNumber);
  const currentPage = page ? Number(page) : Settings.InitialPageNumber;
  const sortedOriginalPrices = useMemo(() => getSortedPrices(originalCameras), [originalCameras]);
  const sortedFilteredPrices = getSortedPrices(cameras);
  const [ isAddItemModalOpen, setAddItemModalOpen ] = useState(false);
  const [ currentCamera, setCurrentCamera ] = useState({} as Camera);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const sortCategoryParams = searchParams.get(QueryParams.Sort);
  const sortOrderParams = searchParams.get(QueryParams.Order);
  const priceMinParams = searchParams.get(QueryParams.PriceMin);
  const priceMaxParams = searchParams.get(QueryParams.PriceMax);
  const cameraCategoryParams = searchParams.getAll(QueryParams.Category);
  const cameraTypeParams = searchParams.getAll(QueryParams.Type);
  const cameraLevelParams = searchParams.getAll(QueryParams.Level);

  useEffect(() => {
    if (!isInitialLoading) {
      dispatch(fetchCamerasAction(searchParams.toString()));
    }
  }, [dispatch, isInitialLoading, searchParams]);

  const onPriceChange = useCallback(
    (minPrice: string, maxPrice: string) => {
      const updatedSearchParams = new URLSearchParams(searchParams);

      if (minPrice) {
        updatedSearchParams.set(QueryParams.PriceMin, minPrice);
      }

      if (maxPrice) {
        updatedSearchParams.set(QueryParams.PriceMax, maxPrice);
      }

      navigate(`${AppRoute.Catalog}/${Settings.InitialPageNumber}?${updatedSearchParams.toString()}`);
    }, [navigate, searchParams]
  );

  const onFilterChange = useCallback(
    ({target}: ChangeEvent<HTMLInputElement>) => {
      const updatedSearchParams = new URLSearchParams(searchParams);

      switch (target.name) {
        case 'photocamera': case 'videocamera': {
          const cameraCategories = cameraCategoryParams.includes(target.value) ?
            cameraCategoryParams.filter((category) => category !== target.value) :
            [...cameraCategoryParams, target.value];
          updatedSearchParams.delete(QueryParams.Category);
          cameraCategories.forEach((category) => updatedSearchParams.append(QueryParams.Category, category));

          if (cameraCategories.includes(CameraCategory.Video) && !cameraCategories.includes(CameraCategory.Photo)) {
            const cameraTypes = cameraTypeParams.filter((type) => type !== CameraType.Film && type !== CameraType.Snapshot);
            updatedSearchParams.delete(QueryParams.Type);
            cameraTypes.forEach((type) => updatedSearchParams.append(QueryParams.Type, type));
          }

          break;
        }

        case 'digital': case 'film': case 'snapshot': case 'collection': {
          const cameraTypes = cameraTypeParams.includes(target.value) ?
            cameraTypeParams.filter((type) => type !== target.value) :
            [...cameraTypeParams, target.value];
          updatedSearchParams.delete(QueryParams.Type);
          cameraTypes.forEach((type) => updatedSearchParams.append(QueryParams.Type, type));
          break;
        }

        case 'zero': case 'non-professional': case'professional': {
          const cameraLevels = cameraLevelParams.includes(target.value) ?
            cameraLevelParams.filter((level) => level !== target.value) :
            [...cameraLevelParams, target.value];
          updatedSearchParams.delete(QueryParams.Level);
          cameraLevels.forEach((level) => updatedSearchParams.append(QueryParams.Level, level));
          break;
        }
      }

      navigate(`${AppRoute.Catalog}/${Settings.InitialPageNumber}?${updatedSearchParams.toString()}`);
    }, [cameraCategoryParams, cameraLevelParams, cameraTypeParams, navigate, searchParams]
  );

  const onFilterReset = useCallback(
    () => navigate(`${AppRoute.Catalog}/${Settings.InitialPageNumber}`), [navigate]
  );

  const onSortCategoryChange = useCallback(
    ({target}: ChangeEvent<HTMLInputElement>) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set(QueryParams.Sort, target.value);
      updatedSearchParams.set(QueryParams.Order, sortOrderParams ?? SortOrder.Asc);
      setSearchParams(updatedSearchParams);
    }, [searchParams, setSearchParams, sortOrderParams]
  );

  const onSortOrderChange = useCallback(
    ({target}: ChangeEvent<HTMLInputElement>) => {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.set(QueryParams.Sort, sortCategoryParams ?? SortCategory.Price);
      updatedSearchParams.set(QueryParams.Order, target.value);
      setSearchParams(updatedSearchParams);
    }, [searchParams, setSearchParams, sortCategoryParams]
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

  if (isLoading || isInitialLoading || isPromoLoading) {
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
                <CatalogFilter
                  minPrice={priceMinParams ?? ''}
                  maxPrice={priceMaxParams ?? ''}
                  sortedOriginalPrices={sortedOriginalPrices}
                  sortedFilteredPrices={sortedFilteredPrices}
                  isPhotocamera={cameraCategoryParams.includes(CameraCategory.Photo)}
                  isVideoCamera={cameraCategoryParams.includes(CameraCategory.Video)}
                  isDigital={cameraTypeParams.includes(CameraType.Digital)}
                  isFilm={cameraTypeParams.includes(CameraType.Film)}
                  isSnapshot={cameraTypeParams.includes(CameraType.Snapshot)}
                  isCollection={cameraTypeParams.includes(CameraType.Collection)}
                  isNovice={cameraLevelParams.includes(CameraLevel.Novice)}
                  isAmateur={cameraLevelParams.includes(CameraLevel.Amateur)}
                  isPro={cameraLevelParams.includes(CameraLevel.Pro)}
                  onPriceChange={onPriceChange}
                  onFilterChange={onFilterChange}
                  onFilterReset={onFilterReset}
                />
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
                    searchParams={searchParams.toString()}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        {isAddItemModalOpen && <AddItemModal camera={currentCamera} closeAddItemModal={closeAddItemModal}/>}
        {isAddSuccessModalOpen && !isAddItemModalOpen && <AddSuccessModal isCatalog />}
      </main>
      <Footer />
    </div>
  );
}

export default CatalogScreen;

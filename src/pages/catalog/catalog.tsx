import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Banner from '../../components/banner/banner';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSorter from '../../components/catalog-sorter/catalog-sorter';
import PaginationList from '../../components/pagination-list/pagination-list';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/selectors';
import { Camera } from '../../types/camera';

function Catalog(): JSX.Element {
  const { page } = useParams();
  const cameras = useAppSelector(getCameras);
  const pagesTotal = Math.ceil(cameras.length / 9);
  const currentPage = page ? Number(page) : 1;
  const [ isAddItemModalOpen, setAddItemModalOpen ] = useState(false);
  const [ currentCamera, setCurrentCamera ] = useState({} as Camera);

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

  if (pagesTotal) {
    if (currentPage > pagesTotal || currentPage < 1 || isNaN(currentPage)) {
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
                  <CatalogSorter />
                  <ProductCardsList
                    cameras={cameras}
                    currentPage={currentPage}
                    openAddItemModal={openAddItemModal}
                  />
                  <PaginationList pagesTotal={pagesTotal} currentPage={currentPage}/>
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

export default Catalog;

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SimilarProductSlider from '../../components/similar-product-slider/similar-product-slider';
import ReviewBlock from '../../components/review-block/review-block';
import RatingStars from '../../components/rating-stars/rating-stars';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import Tabs from '../../components/tabs/tabs';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { useFetchCamera } from '../../hooks/api-hooks/use-fetch-camera';
import { useFetchSimilarCameras } from '../../hooks/api-hooks/use-fetch-similar-cameras';
import { useFetchReviews } from '../../hooks/api-hooks/use-fetch-reviews';
import { getBasketItems } from '../../store/basket/selectors';
import { formatPrice, sortReviewsByDate } from '../../utils/common';
import { Camera } from '../../types/camera';

function Item(): JSX.Element {
  const { id } = useParams();
  const [ camera, status ] = useFetchCamera(id);
  const [ similarCameras ] = useFetchSimilarCameras(id);
  const [ reviews ] = useFetchReviews(id);
  const [ isAddItemModalOpen, setAddItemModalOpen ] = useState(false);
  const [ currentCamera, setCurrentCamera ] = useState({} as Camera);
  const basketItemsCount = useAppSelector(getBasketItems).length;
  const sortedReviews = reviews.sort(sortReviewsByDate);

  const openAddItemModal = useCallback(
    (cameraItem: Camera) => {
      setCurrentCamera(cameraItem);
      setAddItemModalOpen(true);
    }, []
  );

  const closeAddItemModal = useCallback(
    () => {
      setAddItemModalOpen(false);
    }, []
  );

  if (!id || status === RequestStatus.Error) {
    return <NotFoundScreen />;
  }

  if (!camera || status === RequestStatus.Loading) {
    return <LoadingScreen />;
  }

  const {
    name,
    vendorCode,
    type,
    category,
    description,
    level,
    rating,
    price,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    reviewCount
  } = camera;

  return (
    <div className="wrapper">
      <Header basketItemsCount={basketItemsCount}/>
      <main>
        <div className="page-content">
          <BreadCrumbs item={name}/>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
                    <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt={name}/>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{name}</h1>
                  <RatingStars rating={rating} reviewCount={reviewCount}/>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽</p>
                  <button className="btn btn--purple" type="button" onClick={() => openAddItemModal(camera)}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <Tabs id={id} vendorCode={vendorCode} category={category} type={type} level={level} description={description}/>
                </div>
              </div>
            </section>
          </div>
          {similarCameras.length !== 0 && <SimilarProductSlider similarCameras={similarCameras} openAddItemModal={openAddItemModal}/>}
          <ReviewBlock reviews={sortedReviews}/>
        </div>
        <HashLink className="up-btn" smooth to="#">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </HashLink>
        {isAddItemModalOpen && <AddItemModal camera={currentCamera} closeAddItemModal={closeAddItemModal}/>}
      </main>
      <Footer />
    </div>
  );
}

export default Item;

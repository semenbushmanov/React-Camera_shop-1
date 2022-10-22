import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SimilarProductSlider from '../../components/similar-product-slider/similar-product-slider';
import ReviewBlock from '../../components/review-block/review-block';
import RatingStars from '../../components/rating-stars/rating-stars';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import AddItemModal from '../../components/add-item-modal/add-item-modal';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { RequestStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { useFetchCamera } from '../../hooks/api-hooks/useFetchCamera';
import { getBasketItems } from '../../store/basket/selectors';
import { formatPrice } from '../../utils/common';

function Item(): JSX.Element {
  const { id } = useParams();
  const [ camera, status ] = useFetchCamera(id);
  const [ isAddItemModalOpen, setAddItemModalOpen ] = useState(false);
  const basketItemsCount = useAppSelector(getBasketItems).length;

  const toggleAddItemModal = useCallback(
    () => {
      setAddItemModalOpen(!isAddItemModalOpen);
    }, [isAddItemModalOpen]
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
                  <button className="btn btn--purple" type="button" onClick={toggleAddItemModal}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <button className="tabs__control" type="button">Характеристики</button>
                      <button className="tabs__control is-active" type="button">Описание</button>
                    </div>
                    <div className="tabs__content">
                      <div className="tabs__element">
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className="tabs__element is-active">
                        <div className="product__tabs-text">
                          <p>{description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <SimilarProductSlider />
          <ReviewBlock />
        </div>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        {isAddItemModalOpen && <AddItemModal camera={camera} closeAddItemModal={toggleAddItemModal}/>}
      </main>
      <Footer />
    </div>
  );
}

export default Item;

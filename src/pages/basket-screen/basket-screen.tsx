import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BasketCard from '../../components/basket-card/basket-card';
import RemoveItemModal from '../../components/remove-item-modal/remove-item-modal';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getBasketItems } from '../../store/basket/selectors';
import { getOriginalCameras } from '../../store/cameras-data/selectors';
import { useAppSelector } from '../../hooks';
import { Camera } from '../../types/camera';

function BasketScreen(): JSX.Element {
  const originalCameras = useAppSelector(getOriginalCameras);
  const basketItems = useAppSelector(getBasketItems);
  const basketCameras = basketItems.map((item) =>
    originalCameras.find((camera) => camera.id === item.id) ?? {} as Camera);
  const [ isRemoveItemModalOpen, setRemoveItemModalOpen ] = useState(false);
  const [ currentCamera, setCurrentCamera ] = useState({} as Camera);

  const openRemoveItemModal = useCallback(
    (cameraItem: Camera) => {
      setCurrentCamera(cameraItem);
      setRemoveItemModalOpen(true);
    }, []
  );

  const closeRemoveItemModal = useCallback(
    () => setRemoveItemModalOpen(false), []
  );

  return (
    <div className="wrapper">
      <Header />
      <main>
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
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {basketCameras.map((camera) =>
                  <BasketCard camera={camera} quantity={1} removeItem={openRemoveItemModal} key={camera.id}/>
                )}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод"/>
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isRemoveItemModalOpen &&
          <RemoveItemModal camera={currentCamera} closeModal={closeRemoveItemModal}/>}
      </main>
      <Footer />
    </div>
  );
}

export default BasketScreen;

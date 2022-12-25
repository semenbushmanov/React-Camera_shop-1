import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BasketCard from '../../components/basket-card/basket-card';
import RemoveItemModal from '../../components/remove-item-modal/remove-item-modal';
import LoadingScreen from '../loading-screen/loading-screen';
import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getBasketItems, getPostingStatus, getCouponErrorStatus,
  getCoupon, getDiscount } from '../../store/basket/selectors';
import { getOriginalCameras } from '../../store/cameras-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCouponAction } from '../../store/api-actions';
import { resetCoupon } from '../../store/basket/basket';
import { Camera } from '../../types/camera';
import { BasketItemData } from '../../types/basket';
import { formatPrice } from '../../utils/common';

function BasketScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const originalCameras = useAppSelector(getOriginalCameras);
  const basketItems = useAppSelector(getBasketItems);
  const isPosting = useAppSelector(getPostingStatus);
  const couponError = useAppSelector(getCouponErrorStatus);
  const coupon = useAppSelector(getCoupon);
  const discount = useAppSelector(getDiscount);
  const [ isRemoveItemModalOpen, setRemoveItemModalOpen ] = useState(false);
  const [ currentCamera, setCurrentCamera ] = useState({} as Camera);
  const [ couponInput, setCouponInput ] = useState('');

  const basketData = basketItems.map((item) => {
    const basketCamera = originalCameras.find((camera) => camera.id === item.id);
    let basketItemData = {} as BasketItemData;

    if (basketCamera) {
      basketItemData = {
        camera: basketCamera,
        quantity: item.quantity,
      };
    }

    return basketItemData;
  });

  const totalPrice = basketItems.length === 0 ? 0 :
    basketData.map((item) => item.camera.price * item.quantity)
      .reduce((accumulator, currentSum) => accumulator + currentSum);

  const discountSum = Math.round(totalPrice / 100 * discount);
  const totalPriceWithDiscount = totalPrice - discountSum;

  const openRemoveItemModal = useCallback(
    (cameraItem: Camera) => {
      setCurrentCamera(cameraItem);
      setRemoveItemModalOpen(true);
    }, []
  );

  const closeRemoveItemModal = useCallback(
    () => setRemoveItemModalOpen(false), []
  );

  const handleCouponChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (couponError) {
      dispatch(resetCoupon());
    }

    setCouponInput(target.value.replaceAll(' ', ''));
  };

  const handleCouponSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (couponInput) {
      dispatch(postCouponAction({coupon: couponInput}));
    }
  };

  const getCouponFieldClassName = () => {
    if (couponError) {
      return 'custom-input is-invalid';
    }

    if (coupon && couponInput === coupon) {
      return 'custom-input is-valid';
    }

    return 'custom-input';
  };

  if (isPosting) {
    return (<LoadingScreen />);
  }

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
                {basketData.map((item) => (
                  <BasketCard camera={item.camera} quantity={item.quantity}
                    removeItem={openRemoveItemModal} key={item.camera.id}
                  />)
                )}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом поле
                  </p>
                  <div className="basket-form">
                    <form action="#" onSubmit={handleCouponSubmit}>
                      <div className={getCouponFieldClassName()}>
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод"
                            value={couponInput} onChange={handleCouponChange}
                          />
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
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{`${formatPrice(totalPrice)} ₽`}</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">
                      {`${formatPrice(discountSum)} ₽`}
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {`${formatPrice(totalPriceWithDiscount)} ₽`}
                    </span>
                  </p>
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

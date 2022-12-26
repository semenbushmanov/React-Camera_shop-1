import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import BasketCard from '../../components/basket-card/basket-card';
import RemoveItemModal from '../../components/remove-item-modal/remove-item-modal';
import OrderSuccessModal from '../../components/order-success-modal/order-success-modal';
import LoadingScreen from '../loading-screen/loading-screen';
import { useState, useCallback, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { getBasketItems, getOrderSuccessModalStatus, getPostingStatus, getCouponErrorStatus,
  getCoupon, getDiscount } from '../../store/basket/selectors';
import { getOriginalCameras } from '../../store/cameras-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCouponAction, postOrderAction } from '../../store/api-actions';
import { resetCoupon } from '../../store/basket/basket';
import { Camera } from '../../types/camera';
import { BasketItemData } from '../../types/basket';
import { formatPrice } from '../../utils/common';
import { useLocation } from 'react-router';

function BasketScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const originalCameras = useAppSelector(getOriginalCameras);
  const basketItems = useAppSelector(getBasketItems);
  const isOrderSuccessModalOpen = useAppSelector(getOrderSuccessModalStatus);
  const isPosting = useAppSelector(getPostingStatus);
  const couponError = useAppSelector(getCouponErrorStatus);
  const coupon = useAppSelector(getCoupon);
  const discount = useAppSelector(getDiscount);
  const [ isRemoveItemModalOpen, setRemoveItemModalOpen ] = useState(false);
  const [ currentCamera, setCurrentCamera ] = useState({} as Camera);
  const [ couponInput, setCouponInput ] = useState(coupon ?? '');
  const [ scrollPosition, setScrollPosition ] = useState(0);

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  useEffect(() => {
    if (couponError || coupon) {
      window.scrollTo(0, scrollPosition);
    }
  }, [coupon, couponError, scrollPosition]);

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
  const basketIds = basketItems.map((item) => item.id);

  const openRemoveItemModal = useCallback(
    (cameraItem: Camera) => {
      setCurrentCamera(cameraItem);
      setRemoveItemModalOpen(true);
    }, []
  );

  const closeRemoveItemModal = useCallback(() => setRemoveItemModalOpen(false), []);
  const clearCouponInput = useCallback(() => setCouponInput(''), []);

  const handleCouponChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (couponError) {
      dispatch(resetCoupon());
    }

    setCouponInput(target.value.replaceAll(' ', ''));
  };

  const handleCouponSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (couponInput) {
      setScrollPosition(window.scrollY);
      dispatch(postCouponAction({coupon: couponInput}));
    }
  };

  const handleOrderButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    dispatch(postOrderAction({
      camerasIds: basketIds,
      coupon: coupon,
    }));
  };

  const getCouponFieldClassName = () => {
    if (couponInput && couponError) {
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
          <BreadCrumbs item='Корзина'/>
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
                    <form onSubmit={handleCouponSubmit}>
                      <div className={getCouponFieldClassName()}>
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод"
                            value={couponInput} onChange={handleCouponChange}
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit" disabled={!couponInput}>Применить
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
                  <button className="btn btn--purple" type="submit" disabled={basketItems.length === 0}
                    onClick={handleOrderButtonClick}
                  >Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isRemoveItemModalOpen &&
          <RemoveItemModal camera={currentCamera} closeModal={closeRemoveItemModal}/>}
        {isOrderSuccessModalOpen && <OrderSuccessModal onClose={clearCouponInput}/>}
      </main>
      <Footer />
    </div>
  );
}

export default BasketScreen;

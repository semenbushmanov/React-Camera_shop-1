import { basket, addItem, incrementQuantity, decrementQuantity, setQuantity,
  removeItem, resetCoupon, closeAddSuccessModal, resetBasket } from './basket';
import { postCouponAction, postOrderAction } from '../api-actions';

describe('Reducer: basket', () => {
  it('should return initial state without additional parameters', () => {
    expect(basket.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        basketItems: [],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should update basketItems by adding item id and quantity', () => {
    const state = {
      basketItems: [],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, addItem(5)))
      .toEqual({
        basketItems: [{id: 5, quantity: 1}],
        isAddSuccessModalOpen: true,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should increment quantity when incrementQuantity', () => {
    const state = {
      basketItems: [{id: 5, quantity: 1}],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, incrementQuantity(5)))
      .toEqual({
        basketItems: [{id: 5, quantity: 2}],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should decrement quantity when decrementQuantity', () => {
    const state = {
      basketItems: [{id: 5, quantity: 2}],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, decrementQuantity(5)))
      .toEqual({
        basketItems: [{id: 5, quantity: 1}],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should set quantity when setQuantity', () => {
    const state = {
      basketItems: [{id: 5, quantity: 1}],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, setQuantity({id: 5, quantity: 10})))
      .toEqual({
        basketItems: [{id: 5, quantity: 10}],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should remove item when removeItem', () => {
    const state = {
      basketItems: [{id: 5, quantity: 1}],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, removeItem(5)))
      .toEqual({
        basketItems: [],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should set invalidCoupon false when resetCoupon', () => {
    const state = {
      basketItems: [],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: true,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, resetCoupon()))
      .toEqual({
        basketItems: [],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should isAddSuccessModal false when closeAddSuccessModal', () => {
    const state = {
      basketItems: [{id: 5, quantity: 1}],
      isAddSuccessModalOpen: true,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, closeAddSuccessModal()))
      .toEqual({
        basketItems: [{id: 5, quantity: 1}],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should reset basket to initial state after resetBasket', () => {
    const state = {
      basketItems: [{id: 5, quantity: 1}],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: true,
      isPosting: false,
      invalidCoupon: false,
      coupon: 'camera-333',
      discount: 15,
    };

    expect(basket.reducer(state, resetBasket()))
      .toEqual({
        basketItems: [],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });

  it('should add coupon and discount to state after successful posting coupon', () => {
    const state = {
      basketItems: [{id: 5, quantity: 1}],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    const mockCouponResponse = {coupon: 'camera-333', discount: 15};

    expect(basket.reducer(state, {type: postCouponAction.fulfilled.type, payload: mockCouponResponse}))
      .toEqual({
        basketItems: [{id: 5, quantity: 1}],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: false,
        isPosting: false,
        invalidCoupon: false,
        coupon: 'camera-333',
        discount: 15,
      });
  });

  it('should open OrderSuccessModal after successful posting order', () => {
    const state = {
      basketItems: [{id: 5, quantity: 1}],
      isAddSuccessModalOpen: false,
      isOrderSuccessModalOpen: false,
      isPosting: false,
      invalidCoupon: false,
      coupon: null,
      discount: 0,
    };

    expect(basket.reducer(state, {type: postOrderAction.fulfilled.type}))
      .toEqual({
        basketItems: [{id: 5, quantity: 1}],
        isAddSuccessModalOpen: false,
        isOrderSuccessModalOpen: true,
        isPosting: false,
        invalidCoupon: false,
        coupon: null,
        discount: 0,
      });
  });
});

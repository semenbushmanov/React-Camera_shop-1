import { addItem, basket } from './basket';

describe('Reducer: basket', () => {
  it('should return initial state without additional parameters', () => {
    expect(basket.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        basketItems: [],
        isAddSuccessModalOpen: false,
      });
  });

  it('should update basketItems by adding item id and quantity', () => {
    const state = {
      basketItems: [],
      isAddSuccessModalOpen: false,
    };

    expect(basket.reducer(state, addItem(5)))
      .toEqual({
        basketItems: [{id: 5, quantity: 1}],
        isAddSuccessModalOpen: true,
      });
  });
});

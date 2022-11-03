import { addItem, basket } from './basket';

describe('Reducer: basket', () => {
  it('should return initial state without additional parameters', () => {
    expect(basket.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({ camerasIDs: [], });
  });

  it('should update camerasIDs by adding id', () => {
    const state = { camerasIDs: [], };

    expect(basket.reducer(state, addItem(5)))
      .toEqual({ camerasIDs: [5], });
  });
});

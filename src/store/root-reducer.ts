import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data';
import { basket } from './basket/basket';

export const rootReducer = combineReducers({
  [NameSpace.Data]: camerasData.reducer,
  [NameSpace.Basket]: basket.reducer,
});

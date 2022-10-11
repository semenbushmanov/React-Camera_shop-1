import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: camerasData.reducer,
});

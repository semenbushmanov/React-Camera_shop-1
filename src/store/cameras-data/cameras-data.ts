import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Promo } from '../../types/camera';
import { CamerasData } from '../../types/state';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

const initialState: CamerasData = {
  cameras: [],
  isDataLoading:false,
  promo: {} as Promo,
};

export const camerasData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});

import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Promo } from '../../types/camera';
import { CamerasData } from '../../types/state';
import { fetchCamerasAction, fetchPromoAction, postReviewAction } from '../api-actions';
import { resetReviewSuccess } from '../action';

const initialState: CamerasData = {
  cameras: [],
  isDataLoading:false,
  promo: {} as Promo,
  isPromoLoading: false,
  isPosting: false,
  reviewSuccess: false,
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
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isDataLoading = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoading = false;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isPromoLoading = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isPosting = true;
      }).addCase(postReviewAction.fulfilled, (state) => {
        state.isPosting = false;
        state.reviewSuccess = true;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isPosting = false;
      })
      .addCase(resetReviewSuccess, (state) => {
        state.reviewSuccess = false;
      });
  }
});

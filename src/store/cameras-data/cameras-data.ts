import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Promo } from '../../types/camera';
import { CamerasData } from '../../types/state';
import { fetchOriginalCamerasAction, fetchCamerasAction, fetchPromoAction, postReviewAction } from '../api-actions';

const initialState: CamerasData = {
  originalCameras: [],
  isInitialLoading: false,
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
  reducers: {
    resetReviewSuccess: (state) => {
      state.reviewSuccess = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOriginalCamerasAction.pending, (state) => {
        state.isInitialLoading = true;
      })
      .addCase(fetchOriginalCamerasAction.fulfilled, (state, action) => {
        state.originalCameras = action.payload;
        state.cameras = action.payload;
        state.isInitialLoading = false;
      })
      .addCase(fetchOriginalCamerasAction.rejected, (state) => {
        state.isInitialLoading = false;
      })
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
      });
  }
});

export const { resetReviewSuccess } = camerasData.actions;

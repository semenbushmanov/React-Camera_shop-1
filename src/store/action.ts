import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const resetReviewSuccess = createAction('data/resetReviewSuccess');

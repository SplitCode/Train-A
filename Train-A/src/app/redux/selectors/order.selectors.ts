import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../states/order.state';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectBook = createSelector(
  selectOrderState,
  (state: OrderState) => state.book,
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error,
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.loading,
);

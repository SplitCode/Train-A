import { createSelector } from '@ngrx/store';
import { OrderState } from '../states/order.state';
import { OrderRequest } from '../../home/models/order-responce.interface';
import { AppState } from '../states/app.state';

const selectOrderState = (state: AppState): OrderState => state.orderState;

export const selectBook = createSelector(
  selectOrderState,
  (state: OrderState): OrderRequest | null => {
    console.log('OrderState:', state);
    return state?.book ? state.book : null;
  },
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error,
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.loading,
);

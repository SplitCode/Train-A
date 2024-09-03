import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../states/order.state';
import { OrderRequest } from '../../home/models/order-responce.interface';
import { Order } from '../../home/models/orders.interface';

export const selectOrderState = createFeatureSelector<OrderState>('orderState');

export const selectOrders = createSelector(
  selectOrderState,
  (state: OrderState): Order[] | [] => {
    console.log('OrderState:', state);
    return state?.orders ? state.orders : [];
  },
);

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

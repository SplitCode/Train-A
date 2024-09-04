import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../states/order.state';
import { OrderRequest } from '../../home/models/order-responce.interface';
import { Order } from '../../home/models/orders.interface';

export const selectOrderState = createFeatureSelector<OrderState>('orderState');

export const selectOrders = createSelector(
  selectOrderState,
  (state: OrderState): Order[] | [] => {
    return state?.orders ? state.orders : [];
  },
);

export const selectOrdersByRideId = (rideId: number) =>
  createSelector(selectOrders, (orders: Order[]): Order[] => {
    const filteredOrders = orders.filter((order) => order.rideId === rideId);
    return filteredOrders;
  });

export const selectOccupiedSeatsByRideId = (rideId: number) =>
  createSelector(selectOrdersByRideId(rideId), (orders: Order[]): number[] => {
    const seatIds = orders.map((order) => order.seatId);
    return seatIds;
  });

export const selectBook = createSelector(
  selectOrderState,
  (state: OrderState): OrderRequest | null => {
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

export const selectModalInfo = createSelector(
  selectOrderState,
  (state: OrderState) => state.modalInfo,
);

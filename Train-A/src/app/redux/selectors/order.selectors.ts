import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../states/order.state';
import { OrderRequest } from '../../home/models/order-responce.interface';
import { OrderItem } from '../../order/models/order-item.interface';

export const selectOrderState = createFeatureSelector<OrderState>('orderState');

export const selectOrders = createSelector(
  selectOrderState,
  (state: OrderState): OrderItem[] | [] => {
    return state?.orders ? state.orders : [];
  },
);

export const selectOrdersByRideId = (rideId: number) =>
  createSelector(selectOrders, (orders: OrderItem[]): OrderItem[] => {
    const filteredOrders = orders.filter((order) => order.rideId === rideId);
    return filteredOrders;
  });

export const selectOccupiedSeatsByRideId = (rideId: number) =>
  createSelector(
    selectOrdersByRideId(rideId),
    (orders: OrderItem[]): number[] => {
      const seatIds = orders.map((order) => order.seatId);
      return seatIds;
    },
  );

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

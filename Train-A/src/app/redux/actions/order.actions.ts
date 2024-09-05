import { createAction, props } from '@ngrx/store';
import { ErrorOrderResponse } from '../../home/models/order-responce.interface';
import { OrderItem, User } from '../../order/models/order-item.interface';
import { ModalInfo } from '../states/order.state';

export const cancelOrder = createAction(
  '[Order] Cancel Order',
  props<{ orderId: number }>(),
);

export const cancelOrderSuccess = createAction('[Order] Cancel Order Success');

export const cancelOrderFailure = createAction(
  '[Order] Cancel Order Failure',
  props<{ error: ErrorOrderResponse }>(),
);

export const getOrders = createAction(
  '[Order] Get Orders',
  props<{ all: boolean }>(),
);

export const getOrdersSuccess = createAction(
  '[Order] Get Orders Success',
  props<{ orders: OrderItem[] }>(),
);

export const getOrdersFailure = createAction(
  '[Order] Get Orders Failure',
  props<{ error: ErrorOrderResponse }>(),
);

export const getUsers = createAction('[User] Get Users');

export const getUsersSuccess = createAction(
  '[User] Get Users Success',
  props<{ users: User[] }>(),
);

export const getUsersFailure = createAction(
  '[User] Get Users Failure',
  props<{ error: string }>(),
);

export const orderModal = createAction(
  '[OrderModal] Order Modal',
  props<{ modalInfo: ModalInfo }>(),
);

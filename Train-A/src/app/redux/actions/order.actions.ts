import { createAction, props } from '@ngrx/store';
import {
  ErrorOrderResponse,
  OrderRequest,
  SuccessOrderResponse,
} from '../../home/models/order-responce.interface';
import { Order } from '../../home/models/orders.interface';
import { User } from '../../order/models/order-item.interface';
import { ModalInfo } from '../states/order.state';

export const createBook = createAction(
  '[Order] Create Book',
  props<{ book: OrderRequest }>(),
);

export const createOrder = createAction(
  '[Order] Create Order',
  props<{ orderRequest: OrderRequest }>(),
);

export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ orderResponse: SuccessOrderResponse }>(),
);

export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: ErrorOrderResponse }>(),
);

export const cancelOrder = createAction(
  '[Order] Cancel Order',
  props<{ orderId: number }>(),
);

export const cancelOrderSuccess = createAction('[Order] Cancel Order Success');

export const cancelOrderFailure = createAction(
  '[Order] Cancel Order Failure',
  props<{ error: ErrorOrderResponse }>(),
);

export const deleteOrderSuccess = createAction(
  '[Order] Delete Order Success',
  props<{ orderId: number }>(),
);

export const getOrders = createAction('[Order] Get Orders');

export const getAllOrders = createAction(
  '[Order] Get Orders',
  props<{ all: boolean }>(),
);

export const getOrdersSuccess = createAction(
  '[Order] Get Orders Success',
  props<{ orders: Order[] }>(),
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

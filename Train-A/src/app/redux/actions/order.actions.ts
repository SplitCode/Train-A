import { createAction, props } from '@ngrx/store';
import {
  ErrorOrderResponse,
  OrderRequest,
  SuccessOrderResponse,
} from '../../home/models/order-responce.interface';
import { Order } from '../../home/models/orders.interface';
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

export const getOrders = createAction('[Order] Get Orders');
export const getOrdersSuccess = createAction(
  '[Order] Get Orders Success',
  props<{ orders: Order[] }>(),
);
export const getOrdersFailure = createAction(
  '[Order] Get Orders Failure',
  props<{ error: ErrorOrderResponse }>(),
);

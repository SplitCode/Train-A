import { createAction, props } from '@ngrx/store';
import { OrderItem } from '../../order/models/order-item.interface';

export const loadOrders = createAction('[Order List] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Carriage List] Load Orders Success',
  props<{ carriages: OrderItem[] }>(),
);

export const loadOrdersFailure = createAction(
  '[Carriage List] Load Orders Failure',
  props<{ error: unknown }>(),
);
// add user and order by id

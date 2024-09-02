import { createReducer, on } from '@ngrx/store';
import {
  createOrder,
  createOrderSuccess,
  createOrderFailure,
  cancelOrder,
  cancelOrderSuccess,
  cancelOrderFailure,
  createBook,
  // createBook,
} from '../actions/order.actions';
import { initialState } from '../states/order.state';
import { OrderState } from '../states/order.state';

export const orderReducer = createReducer(
  initialState,
  on(createBook, (state, { book }): OrderState => {
    console.log('Reducer - createBook:', state);
    return {
      ...state,
      book,
      loading: false,
      error: undefined,
    };
  }),
  on(
    createOrder,
    (state): OrderState => ({
      ...state,
      loading: true,
      error: undefined,
    }),
  ),
  on(
    createOrderSuccess,
    (state, { orderResponse }): OrderState => ({
      ...state,
      orderResponse: orderResponse,
      loading: false,
    }),
  ),
  on(
    createOrderFailure,
    (state, { error }): OrderState => ({
      ...state,
      error,
      loading: false,
    }),
  ),
  on(
    cancelOrder,
    (state): OrderState => ({
      ...state,
      loading: true,
      error: undefined,
    }),
  ),
  on(
    cancelOrderSuccess,
    (state): OrderState => ({
      ...state,
      loading: false,
    }),
  ),
  on(
    cancelOrderFailure,
    (state, { error }): OrderState => ({
      ...state,
      error,
      loading: false,
    }),
  ),
);

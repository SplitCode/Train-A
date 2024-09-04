import { createReducer, on } from '@ngrx/store';
import {
  cancelOrder,
  cancelOrderSuccess,
  cancelOrderFailure,
  getOrdersFailure,
  getOrdersSuccess,
  orderModal,
  // deleteOrderSuccess,
  // createBook,
} from '../actions/order.actions';
import { initialState } from '../states/order.state';
import { OrderState } from '../states/order.state';
import {
  createBook,
  createOrder,
  createOrderFailure,
  createOrderSuccess,
} from '../actions/ride.actions';

export const orderReducer = createReducer(
  initialState,
  on(createBook, (state, { book }): OrderState => {
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
  // on(
  //   deleteOrderSuccess,
  //   (state, { orderId }): OrderState => ({
  //     ...state,
  //     orders: state.orders.filter((order) => order.id !== orderId),
  //   }),
  // ),
  on(
    cancelOrderFailure,
    (state, { error }): OrderState => ({
      ...state,
      error,
      loading: false,
    }),
  ),
  on(
    getOrdersSuccess,
    (state, { orders }): OrderState => ({
      ...state,
      orders,
      loading: false,
    }),
  ),
  on(
    getOrdersFailure,
    (state, { error }): OrderState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(
    orderModal,
    (state, { modalInfo }): OrderState => ({
      ...state,
      modalInfo: modalInfo,
    }),
  ),
);

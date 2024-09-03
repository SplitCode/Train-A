import {
  SuccessOrderResponse,
  ErrorOrderResponse,
  OrderRequest,
} from '../../home/models/order-responce.interface';

export interface OrderState {
  book: OrderRequest | null;
  orderRequest: OrderRequest | null;
  orderResponse: SuccessOrderResponse | null;
  error?: ErrorOrderResponse;
  loading: boolean;
}
export const initialState: OrderState = {
  book: null,
  orderRequest: null,
  orderResponse: null,
  error: undefined,
  loading: false,
};

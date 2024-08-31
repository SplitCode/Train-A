import {
  SuccessOrderResponse,
  ErrorOrderResponse,
  OrderRequest,
} from '../../home/models/order-responce.interface';

export interface OrderState {
  book: OrderRequest | null;
  orderRequest: OrderRequest | null;
  orderResponce: SuccessOrderResponse | null;
  error?: ErrorOrderResponse;
  loading: boolean;
}
export const initialState: OrderState = {
  book: null,
  orderRequest: null,
  orderResponce: null,
  error: undefined,
  loading: false,
};

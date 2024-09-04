import {
  SuccessOrderResponse,
  ErrorOrderResponse,
  OrderRequest,
} from '../../home/models/order-responce.interface';
import { OrderItem } from '../../order/models/order-item.interface';

export interface OrderState {
  book: OrderRequest | null;
  orderRequest: OrderRequest | null;
  orderResponse: SuccessOrderResponse | null;
  error?: ErrorOrderResponse;
  loading: boolean;
  orders: OrderItem[];
  modalInfo: ModalInfo;
}

export const initialState: OrderState = {
  book: null,
  orderRequest: null,
  orderResponse: null,
  error: undefined,
  loading: false,
  orders: [],
  modalInfo: {
    visibleModal: false,
    orderInfo: {
      id: 0,
    },
  },
};

export interface ModalInfo {
  visibleModal: boolean;
  orderInfo: {
    id: number;
  };
}

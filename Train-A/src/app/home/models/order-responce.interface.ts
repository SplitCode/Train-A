export interface OrderRequest {
  rideId: number;
  seat: number;
  fromStationId: number;
  toStationId: number;
  carriageNumber: number;
  isShowBook: boolean;
  price?: number;
}

export interface OrderResponse {
  success?: SuccessOrderResponse;
  error?: ErrorOrderResponse;
}

export interface SuccessOrderResponse {
  id: string;
}

export interface ErrorOrderResponse {
  error: {
    message: string;
    reason: string;
  };
}

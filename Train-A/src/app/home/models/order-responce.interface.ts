export interface OrderRequest {
  rideId: number;
  seat: number;
  stationStart: number;
  stationEnd: number;
  carriageNumber?: number;
  isShowBook?: boolean;
  price?: number;
}

export interface OrderResponse {
  success?: SuccessOrderResponse;
  error?: ErrorOrderResponse;
}

export interface SuccessOrderResponse {
  id: number;
}

export interface ErrorOrderResponse {
  error: {
    message: string;
    reason: string;
  };
}

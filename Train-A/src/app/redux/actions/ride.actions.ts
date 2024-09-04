import { createAction, props } from '@ngrx/store';
import { RideResponse } from '../../home/models/ride-response.interface';
import { CarriageItem } from '../../admin/models/carriage-item.interface';
import {
  ErrorOrderResponse,
  OrderRequest,
  SuccessOrderResponse,
} from '../../home/models/order-responce.interface';
export const createBook = createAction(
  '[Order] Create Book',
  props<{ book: OrderRequest }>(),
);
export const createOrder = createAction(
  '[Order] Create Order',
  props<{ orderRequest: OrderRequest }>(),
);
export const loadRideInfo = createAction(
  '[Ride] Load Ride Info',
  props<{ rideId: string }>(),
);
export const createOrderSuccess = createAction(
  '[Order] Create Order Success',
  props<{ orderResponse: SuccessOrderResponse }>(),
);

export const createOrderFailure = createAction(
  '[Order] Create Order Failure',
  props<{ error: ErrorOrderResponse }>(),
);
export const loadRideInfoSuccess = createAction(
  '[Ride] Load Ride Info Success',
  props<{ rideInfo: RideResponse }>(),
);

export const loadRideInfoFailure = createAction(
  '[Ride] Load Ride Info Failure',
  props<{ error: unknown }>(),
);

export const updateFilteredCarriages = createAction(
  '[Ride] Update Filtered Carriages',
  (filteredCarriages: CarriageItem[]) => ({
    filteredCarriages,
  }),
);

export const loadFilteredCarriages = createAction(
  '[Ride] Load Filtered Carriages',
);

export const loadFilteredCarriagesSuccess = createAction(
  '[Ride] Load Filtered Carriages Success',
  props<{ filteredCarriages: CarriageItem[] }>(),
);

export const loadCarriagesAndStationsFailure = createAction(
  '[Ride] Load Carriages and Stations Failure',
  props<{ error: unknown }>(),
);

import { createAction, props } from '@ngrx/store';
import { RideResponse } from '../../order/models/ride-response.interface';
import { CarriageItem } from '../../admin/models/carriage-item.interface';

export const loadRideInfo = createAction(
  '[Ride] Load Ride Info',
  props<{ rideId: string }>(),
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
  props<{ filteredCarriages: CarriageItem[] }>(),
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

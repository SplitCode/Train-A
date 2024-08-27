import { createAction, props } from '@ngrx/store';
import { RideResponse } from '../../order/models/ride-response.interface';

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

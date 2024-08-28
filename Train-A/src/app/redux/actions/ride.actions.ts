import { createAction, props } from '@ngrx/store';
import { RideResponse } from '../../order/models/ride-response.interface';
import { CarriageItem } from '../../admin/models/carriage-item.interface';
import { StationsItem } from '../states/stations.state';

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
export const loadCarriagesAndStations = createAction(
  '[Ride] Load Carriages and Stations',
);
export const loadCarriagesAndStationsSuccess = createAction(
  '[Ride] Load Carriages and Stations Success',
  props<{ carriages: CarriageItem[]; stations: StationsItem[] }>(),
);
export const loadCarriagesAndStationsFailure = createAction(
  '[Ride] Load Carriages and Stations Failure',
  props<{ error: unknown }>(),
);

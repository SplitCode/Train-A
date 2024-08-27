import { createReducer, on } from '@ngrx/store';
import {
  loadRideInfoSuccess,
  loadRideInfoFailure,
} from '../actions/ride.actions';
import { RideResponse } from '../../order/models/ride-response.interface';

export interface RideState {
  rideInfo: RideResponse | null;
  error: unknown;
}

export const initialState: RideState = {
  rideInfo: null,
  error: null,
};

export const rideReducer = createReducer(
  initialState,
  on(
    loadRideInfoSuccess,
    (state, { rideInfo }): RideState => ({
      ...state,
      rideInfo,
      error: null,
    }),
  ),
  on(
    loadRideInfoFailure,
    (state, { error }): RideState => ({
      ...state,
      error,
    }),
  ),
);

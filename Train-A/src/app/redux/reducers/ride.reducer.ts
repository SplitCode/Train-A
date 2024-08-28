import { createReducer, on } from '@ngrx/store';
import {
  loadRideInfoSuccess,
  loadRideInfoFailure,
  loadCarriagesAndStationsFailure,
  loadCarriagesAndStationsSuccess,
} from '../actions/ride.actions';
import { initialState, RideState } from '../states/ride.state';

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
  on(
    loadCarriagesAndStationsSuccess,
    (state, { carriages, stations }): RideState => ({
      ...state,
      carriages,
      stations,
      error: null,
    }),
  ),
  on(
    loadCarriagesAndStationsFailure,
    (state, { error }): RideState => ({
      ...state,
      error,
    }),
  ),
);

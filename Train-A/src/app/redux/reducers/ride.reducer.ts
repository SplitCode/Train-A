import { createReducer, on } from '@ngrx/store';
import {
  loadRideInfoSuccess,
  loadRideInfoFailure,
  updateFilteredCarriages,
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
    updateFilteredCarriages,
    (state, { filteredCarriages }): RideState => ({
      ...state,
      filteredCarriages,
    }),
  ),
);

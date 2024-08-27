import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RideState } from '../states/ride.state';

export const selectRideState = createFeatureSelector<RideState>('rideState');

export const selectRideInfo = createSelector(
  selectRideState,
  (state: RideState) => state.rideInfo,
);

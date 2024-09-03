import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RideState } from '../states/ride.state';

export const selectRideState = createFeatureSelector<RideState>('rideState');

export const selectRideInfo = createSelector(
  selectRideState,
  (state: RideState) => state.rideInfo,
);
export const selectPath = createSelector(
  selectRideInfo,
  (rideInfo) => rideInfo?.path,
);
export const selectCarriageTypes = createSelector(
  selectRideState,
  (state: RideState) => state.rideInfo?.carriages,
);
export const selectSchedule = createSelector(
  selectRideInfo,
  (rideInfo) => rideInfo?.schedule,
);
export const selectSegments = createSelector(
  selectSchedule,
  (schedule) => schedule?.segments,
);
export const selectFilteredCarriages = createSelector(
  selectRideState,
  (rideState: RideState) => {
    return rideState.filteredCarriages;
  },
);

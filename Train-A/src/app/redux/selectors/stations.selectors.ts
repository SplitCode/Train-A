import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StationsState } from './../states/stations.state';

export const selectStationsState =
  createFeatureSelector<StationsState>('stationsState');

export const selectAllCarriages = createSelector(
  selectStationsState,
  (state: StationsState) => state.stations,
);

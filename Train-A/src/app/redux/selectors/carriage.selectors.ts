import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CarriageState } from '../states/carriage.state';

export const selectCarriageState =
  createFeatureSelector<CarriageState>('carriageState');

export const selectAllCarriages = createSelector(
  selectCarriageState,
  (state: CarriageState) => state.carriages,
);
export const selectFormVisibleForCarriageCode = createSelector(
  selectCarriageState,
  (state: CarriageState) => state.formVisibleForCarriageCode,
);
export const selectMode = createSelector(
  selectCarriageState,
  (state: CarriageState) => state.mode,
);

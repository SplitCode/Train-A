import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CarriageState } from '../states/carriage.state';
import { CarriageItem } from '../../admin/models/carriage-item.interface';

export const selectCarriageState =
  createFeatureSelector<CarriageState>('carriageState');

export const selectAllCarriages = createSelector(
  selectCarriageState,
  (state: CarriageState) => {
    console.log('[selectCarriageState]', state.carriages);
    return state.carriages;
  },
);

export const selectFormVisibleForCarriageCode = createSelector(
  selectCarriageState,
  (state: CarriageState) => state.formVisibleForCarriageCode,
);
export const selectMode = createSelector(
  selectCarriageState,
  (state: CarriageState) => state.mode,
);
export const selectCarriageByCode = (carriageCode: string) =>
  createSelector(selectAllCarriages, (carriages: CarriageItem[]) => {
    const foundCarriage = carriages.find(
      (carriage) => carriage.code === carriageCode,
    );
    console.log('[selectCarriageByCode]', foundCarriage);
    return foundCarriage;
  });
export const selectCarriageByName = (name: string) =>
  createSelector(selectAllCarriages, (carriages: CarriageItem[]) => {
    return carriages.find((carriage) => carriage.name === name);
  });

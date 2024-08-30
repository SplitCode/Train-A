import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CarriageState } from '../states/carriage.state';
import { CarriageItem } from '../../admin/models/carriage-item.interface';

export const selectCarriageState =
  createFeatureSelector<CarriageState>('carriageState');

export const selectAllCarriages = createSelector(
  selectCarriageState,
  (state: CarriageState) => {
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
    console.log('carriageCode:', carriageCode);
    console.log('selectCarriageByCode - carriages:', carriages);
    const foundCarriage = carriages.find(
      (carriage) => carriage.code === carriageCode,
    );
    console.log('foundCarriage:', foundCarriage);
    return foundCarriage;
  });

export const selectCarriageByName = (name: string) =>
  createSelector(selectAllCarriages, (carriages: CarriageItem[]) => {
    return carriages.find((carriage) => carriage.name === name);
  });

export const selectCarriageNameByCode = (carriageCode: string) =>
  createSelector(selectAllCarriages, (carriages: CarriageItem[]) => {
    const foundCarriage = carriages.find(
      (carriage) => carriage.code === carriageCode,
    );
    return foundCarriage ? foundCarriage.name : 'CariageName';
  });

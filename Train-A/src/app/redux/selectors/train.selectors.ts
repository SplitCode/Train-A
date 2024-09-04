import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainState } from '../states/train.state';
import { CarriageItem } from '../../admin/models/carriage-item.interface';

export const selectTrainState = createFeatureSelector<TrainState>('trainState');

export const selectTrainArray = createSelector(
  selectTrainState,
  (trainState: TrainState) => trainState.trainArray,
);
export const selectCarriageByNameFromTrain = (name: string) =>
  createSelector(selectTrainArray, (carriages: CarriageItem[]) => {
    return carriages.find((carriage) => carriage.name === name);
  });

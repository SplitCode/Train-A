import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { TrainState } from '../states/train.state';
import { CarriageItem } from '../../admin/models/carriage-item.interface';
import { selectCarriageTypes } from './ride.selectors';

export const selectTrainState = (state: AppState) => state.trainState;

export const selectTrainArray = createSelector(
  selectTrainState,
  selectCarriageTypes,
  (trainState: TrainState, carriageCodes: string[] | undefined) => {
    if (!carriageCodes) {
      return [];
    }
    return carriageCodes
      .map((code) => {
        return (
          trainState.trainArray.find(
            (carriage: CarriageItem) => carriage.code === code,
          ) || null
        );
      })
      .filter((carriage) => carriage !== null);
  },
);

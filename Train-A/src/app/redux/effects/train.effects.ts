import { concatLatestFrom } from '@ngrx/operators';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import {
  updateTrainArray,
  updateTrainArraySuccess,
} from '../actions/train.actions';
import { selectAllCarriages } from '../selectors/carriage.selectors';
import { CarriageItem } from '../../admin/models/carriage-item.interface';

@Injectable()
export class TrainEffects {
  private actions$ = inject(Actions);

  private store = inject(Store);

  updateTrainArray$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTrainArray),
      concatLatestFrom(() => this.store.select(selectAllCarriages)),
      map(([action, carriages]) => {
        const trainArray = action.carriageCodes
          .map(({ code, carriageNumber }) => {
            const carriage = carriages.find((car) => car.code === code) || null;
            if (carriage) {
              return { ...carriage, carriageNumber };
            }
            return null;
          })
          .filter((carriage) => carriage !== null);

        return updateTrainArraySuccess({
          trainArray: trainArray as CarriageItem[],
        });
      }),
    );
  });
}

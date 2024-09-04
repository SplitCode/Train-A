import { concatLatestFrom } from '@ngrx/operators';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';

import {
  updateTrainArray,
  updateTrainArraySuccess,
} from '../actions/train.actions';
import { CarriageItem } from '../../admin/models/carriage-item.interface';
import { selectFilteredCarriages } from '../selectors/ride.selectors';
import {
  getOrders,
  getOrdersFailure,
  getOrdersSuccess,
} from '../actions/order.actions';
import { OrderService } from '../../order/services/order.service';

@Injectable()
export class TrainEffects {
  private actions$ = inject(Actions);

  private store = inject(Store);

  private orderService = inject(OrderService);

  updateTrainArray$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTrainArray),
      concatLatestFrom(() => this.store.select(selectFilteredCarriages)),
      map(([action, carriages]) => {
        const trainArray = action.carriageCodes
          .map(({ code, carriageNumber }) => {
            const normalizedCode = code.replace(/-/g, '');
            const carriage =
              carriages.find(
                (car) => car.code.replace(/-/g, '') === normalizedCode,
              ) || null;
            if (carriage) {
              return { ...carriage, carriageNumber };
            }
            return null;
          })
          .filter((carriage) => carriage !== null);

        trainArray.forEach((carriage, index) => {
          if (index === 0) {
            carriage.previousSeats = 0;
          } else if (trainArray[index - 1]) {
            carriage.previousSeats =
              (trainArray[index - 1].previousSeats || 0) +
              (trainArray[index - 1].totalSeats || 0);
          }
        });

        return updateTrainArraySuccess({
          trainArray: trainArray as CarriageItem[],
        });
      }),
    );
  });

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getOrders),
      mergeMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => getOrdersSuccess({ orders })),
          catchError((error) => of(getOrdersFailure({ error }))),
        ),
      ),
    );
  });
}

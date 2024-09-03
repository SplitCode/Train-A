import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { RideService } from '../../home/services/ride.service';
import {
  getOrders,
  getOrdersSuccess,
  getOrdersFailure,
} from '../actions/order.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);

  private rideService = inject(RideService);

  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getOrders),
      mergeMap(() =>
        this.rideService.getOrders().pipe(
          map((orders) => getOrdersSuccess({ orders })),
          catchError((error) => of(getOrdersFailure({ error }))),
        ),
      ),
    );
  });
}

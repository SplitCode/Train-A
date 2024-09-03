import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { RideService } from '../../home/services/ride.service';
import {
  loadRideInfo,
  loadRideInfoSuccess,
  loadRideInfoFailure,
} from '../actions/ride.actions';
import {
  cancelOrder,
  cancelOrderFailure,
  cancelOrderSuccess,
  createOrder,
  createOrderFailure,
  createOrderSuccess,
} from '../actions/order.actions';

@Injectable()
export class RideEffects {
  private actions$ = inject(Actions);

  loadRideInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRideInfo),
      mergeMap((action) =>
        this.rideService.getRideInfo(action.rideId).pipe(
          map((rideInfo) => loadRideInfoSuccess({ rideInfo })),
          catchError((error) => of(loadRideInfoFailure({ error }))),
        ),
      ),
    );
  });

  createOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createOrder),
      mergeMap((action) =>
        this.rideService.createOrder(action.orderRequest).pipe(
          map((orderResponse) => {
            if (orderResponse.success) {
              return createOrderSuccess({
                orderResponse: orderResponse.success,
              });
            } else {
              return createOrderFailure({
                error: {
                  error: { message: 'Unknown error', reason: 'Unknown' },
                },
              });
            }
          }),
          catchError((error) => of(createOrderFailure({ error }))),
        ),
      ),
    );
  });

  cancelOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cancelOrder),
      mergeMap((action) =>
        this.rideService.cancelOrder(action.orderId).pipe(
          map(() => cancelOrderSuccess()),
          catchError((error) => of(cancelOrderFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private rideService: RideService) {}
}

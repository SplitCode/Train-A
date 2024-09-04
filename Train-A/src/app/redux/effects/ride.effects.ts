import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap, tap } from 'rxjs';
import { RideService } from '../../home/services/ride.service';
import {
  loadRideInfo,
  loadRideInfoSuccess,
  loadRideInfoFailure,
  createOrder,
  createOrderFailure,
  createOrderSuccess,
} from '../actions/ride.actions';
import {
  cancelOrder,
  cancelOrderFailure,
  cancelOrderSuccess,
  getOrders,
} from '../actions/order.actions';
import { MessageService } from 'primeng/api';

@Injectable()
export class RideEffects {
  private actions$ = inject(Actions);

  private messageService = inject(MessageService);

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

  createOrderSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createOrderSuccess),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'The order has been successfully created!',
        });
      }),
      switchMap(() => of(getOrders())),
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

  // switchMap(() => of(getOrders({ all: true }))),
  constructor(private rideService: RideService) {}
}

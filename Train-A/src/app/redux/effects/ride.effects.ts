import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { OrderService } from '../../order/services/order.service';
import {
  loadRideInfo,
  loadRideInfoSuccess,
  loadRideInfoFailure,
} from '../actions/ride.actions';

@Injectable()
export class RideEffects {
  private actions$ = inject(Actions);

  loadRideInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRideInfo),
      mergeMap((action) =>
        this.orderService.getRideInfo(action.rideId).pipe(
          map((rideInfo) => loadRideInfoSuccess({ rideInfo })),
          catchError((error) => of(loadRideInfoFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private orderService: OrderService) {}
}

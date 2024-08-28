import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, forkJoin } from 'rxjs';
import { OrderService } from '../../order/services/order.service';
import {
  loadRideInfo,
  loadRideInfoSuccess,
  loadRideInfoFailure,
  loadCarriagesAndStations,
  loadCarriagesAndStationsFailure,
  loadCarriagesAndStationsSuccess,
} from '../actions/ride.actions';
import { Store } from '@ngrx/store';
import { CarriageService } from '../../admin/services/carriage.service';
import { StationsService } from '../../admin/services/stations.service';

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

  loadCarriagesAndStations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCarriagesAndStations),
      mergeMap(() =>
        forkJoin([
          this.carriageService.getCarriages(),
          this.stationsService.getStations(),
        ]).pipe(
          map(([carriages, stations]) =>
            loadCarriagesAndStationsSuccess({ carriages, stations }),
          ),
          catchError((error) => of(loadCarriagesAndStationsFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private orderService: OrderService,
    private carriageService: CarriageService,
    private stationsService: StationsService,
    private store: Store,
  ) {}
}

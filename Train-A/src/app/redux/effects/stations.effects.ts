import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { StationsService } from '../../admin/services/stations.service';
import {
  loadStations,
  loadStationsSuccess,
  loadStationsFailure,
} from '../actions/stations.actions';

@Injectable()
export class CarriageEffects {
  private actions$ = inject(Actions);

  loadStations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadStations),
      mergeMap(() =>
        this.stationsService.getStations().pipe(
          map((stations) => loadStationsSuccess({ stations })),
          catchError((error) => of(loadStationsFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private stationsService: StationsService) {}
}

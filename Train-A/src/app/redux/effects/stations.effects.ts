import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, concatMap } from 'rxjs';
import { StationsService } from '../../admin/services/stations.service';
import {
  loadStations,
  loadStationsSuccess,
  loadStationsFailure,
  createStationFailure,
  createStationSuccess,
  createStation,
  deletedStation,
  deletedStationSuccess,
  deletedStationFailure,
} from '../actions/stations.actions';

@Injectable()
export class StationsEffects {
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

  createStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createStation),
      concatMap(({ station }) =>
        this.stationsService.postStation(station).pipe(
          map((id) => {
            return createStationSuccess({ station: { ...station, id: id } });
          }),
          catchError((error) => {
            console.error('Error creating station:', error);
            return of(
              createStationFailure({ error: error.message || 'Unknown error' }),
            );
          }),
        ),
      ),
    );
  });

  createStationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createStationSuccess),
      map(() => loadStations()),
    );
  });

  deleteStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletedStation),
      mergeMap(({ id }) =>
        this.stationsService.deleteStation(id).pipe(
          map(() => deletedStationSuccess({ stationId: id })),
          catchError((error) => {
            console.error('Error deleting station:', error);
            return of(
              deletedStationFailure({
                error: error.message || 'Unknown error',
              }),
            );
          }),
        ),
      ),
    );
  });

  constructor(private stationsService: StationsService) {}
}

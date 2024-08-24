import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { CarriageService } from '../../admin/services/carriage.service';
import {
  loadCarriages,
  loadCarriagesSuccess,
  loadCarriagesFailure,
  createCarriage,
  createCarriageFailure,
  createCarriageSuccess,
  updateCarriage,
  updateCarriageFailure,
  updateCarriageSuccess,
} from '../actions/carriage.actions';

@Injectable()
export class CarriageEffects {
  private actions$ = inject(Actions);

  loadCarriages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCarriages),
      mergeMap(() =>
        this.carriageService.getCarriages().pipe(
          map((carriages) => loadCarriagesSuccess({ carriages })),
          catchError((error) => of(loadCarriagesFailure({ error }))),
        ),
      ),
    );
  });

  createCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCarriage),
      mergeMap(({ carriage }) =>
        this.carriageService.createCarriage(carriage).pipe(
          map((code) =>
            createCarriageSuccess({ carriage: { ...carriage, code } }),
          ),
          catchError((error) => of(createCarriageFailure({ error }))),
        ),
      ),
    );
  });

  updateCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCarriage),
      tap(() => console.log('Action: updateCarriage')),
      mergeMap(({ carriage }) =>
        this.carriageService.updateCarriage(carriage).pipe(
          map((code) => {
            console.log('Effect: updateCarriageSuccess', code);
            return updateCarriageSuccess({ carriage: { ...carriage, code } });
          }),
          catchError((error) => {
            console.error('Effect: updateCarriageFailure', error);
            return of(updateCarriageFailure({ error }));
          }),
        ),
      ),
    );
  });

  constructor(private carriageService: CarriageService) {}
}

import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
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
      mergeMap(({ createdCarriage }) =>
        this.carriageService.createCarriage(createdCarriage).pipe(
          map((newCarriage) =>
            createCarriageSuccess({ carriage: newCarriage }),
          ),
          catchError((error) => of(createCarriageFailure({ error }))),
        ),
      ),
    );
  });

  updateCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCarriage),
      mergeMap(({ updatedCarriage }) =>
        this.carriageService.updateCarriage(updatedCarriage).pipe(
          map((carriage) =>
            updateCarriageSuccess({ updatedCarriage: carriage }),
          ),
          catchError((error) => of(updateCarriageFailure({ error }))),
        ),
      ),
    );
  });

  constructor(private carriageService: CarriageService) {}
}

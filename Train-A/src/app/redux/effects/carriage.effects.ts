import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { CarriageService } from '../../admin/services/carriage.service';
import {
  loadCarriages,
  loadCarriagesSuccess,
  loadCarriagesFailure,
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

  constructor(private carriageService: CarriageService) {}
}

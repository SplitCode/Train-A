import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
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
      tap((action) => console.log('Action received:', action)),
      mergeMap(() =>
        this.carriageService.getCarriages().pipe(
          tap((carriages) => console.log('Carriages loaded:', carriages)),
          map((carriages) => loadCarriagesSuccess({ carriages })),
          catchError((error) => {
            console.error('Error loading carriages:', error);
            return of(loadCarriagesFailure({ error }));
          }),
        ),
      ),
    );
  });

  constructor(private carriageService: CarriageService) {}
}

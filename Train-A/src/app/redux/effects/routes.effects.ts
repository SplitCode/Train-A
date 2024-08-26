import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { RoutesService } from '../../admin/services/routes.service';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
} from '../actions/routes.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class RoutesEffects {
  private actions$ = inject(Actions);

  loadRoutes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoutes),
      mergeMap(() =>
        this.routesService.getRoutes().pipe(
          map((routes) => loadRoutesSuccess({ routes })),
          catchError((error) => of(loadRoutesFailure({ error }))),
        ),
      ),
    );
  });

  constructor(
    private routesService: RoutesService,
    private store: Store,
  ) {}
}

import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { RoutesService } from '../../admin/services/routes.service';
import { MessageService } from 'primeng/api';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
  deleteRoute,
  deleteRouteSuccess,
  deleteRouteFailure,
  createRouteFailure,
  createRouteSuccess,
  createRoute,
  updateRoute,
  updateRouteSuccess,
  updateRouteFailure,
} from '../actions/routes.actions';
import { RoutesItem } from '../../admin/models/routes-item.interface';

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

  deleteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteRoute),
      mergeMap((action) =>
        this.routesService.deleteRoute(action.routeId).pipe(
          map(() => deleteRouteSuccess({ routeId: action.routeId })),
          tap(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The route has been successfully deleted!',
            });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message || 'Unknown error',
            });

            return of(deleteRouteFailure({ error: error.message }));
          }),
        ),
      ),
    );
  });

  createRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createRoute),
      mergeMap(({ route }) =>
        this.routesService.createRoute(route.path, route.carriages).pipe(
          map((createdRoute: RoutesItem) =>
            createRouteSuccess({ route: createdRoute }),
          ),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message || 'Unknown error',
            });
            return of(createRouteFailure({ error: error.message }));
          }),
        ),
      ),
    );
  });

  createRouteSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createRouteSuccess),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail:
            'The route has been successfully created and added to the end of the list!',
        });
      }),
      map(() => loadRoutes()),
    );
  });

  updateRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRoute),
      mergeMap(({ id, route }) =>
        this.routesService.updateRoute(id, route.path, route.carriages).pipe(
          map((updatedRoute) => {
            return updateRouteSuccess({ route: updatedRoute });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message || 'Unknown error',
            });
            return of(updateRouteFailure({ error: error.message }));
          }),
        ),
      ),
    );
  });

  updateRouteSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRouteSuccess),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'The route has been successfully updated!',
        });
      }),
      map(() => loadRoutes()),
    );
  });

  constructor(
    private routesService: RoutesService,
    private messageService: MessageService,
  ) {}
}

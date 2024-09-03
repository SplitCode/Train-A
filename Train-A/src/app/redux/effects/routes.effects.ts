import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap } from 'rxjs';
import { RoutesService } from '../../admin/services/routes.service';
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
  loadRouteByIdSuccess,
  loadRouteById,
  loadRouteByPathSuccess,
  loadRouteByIdFailure,
  loadRouteByPathFailure,
} from '../actions/routes.actions';
import {
  RoutesItem,
  RoutesItemByPath,
} from '../../admin/models/routes-item.interface';

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
          catchError((error) => of(deleteRouteFailure({ error }))),
        ),
      ),
    );
  });

  createRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createRoute),
      mergeMap(({ route }) =>
        this.routesService.createRoute(route.path, route.carriages).pipe(
          map((createdRoute) => createRouteSuccess({ route: createdRoute })),
          catchError((error) =>
            of(createRouteFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRoute),
      mergeMap(({ route }) =>
        this.routesService
          .updateRoute(route.id, route.path, route.carriages)
          .pipe(
            map((updatedRoute) => createRouteSuccess({ route: updatedRoute })),
            catchError((error) =>
              of(createRouteFailure({ error: error.message })),
            ),
          ),
      ),
    );
  });

  loadRouteById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRouteById),
      switchMap(({ routeId }) =>
        this.routesService.getRouteById(routeId).pipe(
          switchMap((route: RoutesItem) => {
            // Сначала записываем данные в store в route
            // const routeSuccessAction = loadRouteByIdSuccess({ route });
            // // Затем конвертируем данные и записываем в routeByPath
            // const routeByPath: RoutesItemByPath =
            //   this.routesService.convertRoutesItemByPath(route);
            // const routeByPathSuccessAction = loadRouteByPathSuccess({
            //   routeByPath,
            // });
            return of(
              loadRouteByIdSuccess({ route }),
              // routeByPathSuccessAction,
            );
          }),
          catchError((error) =>
            of(loadRouteByIdFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  loadRouteByPath$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRouteById),
      switchMap(({ routeId }) =>
        this.routesService.getRouteById(routeId).pipe(
          switchMap((route: RoutesItem) => {
            const routeByPath: RoutesItemByPath =
              this.routesService.convertRoutesItemByPath(route);
            return of(loadRouteByPathSuccess({ routeByPath }));
          }),
          catchError((error) =>
            of(loadRouteByPathFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  constructor(private routesService: RoutesService) {}
}

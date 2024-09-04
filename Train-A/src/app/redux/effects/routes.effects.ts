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
  deleteRideByIdSuccess,
  deleteRideByIdFailure,
  deleteRideById,
  updateRideById,
  updateRideByIdSuccess,
  updateRideByIdFailure,
} from '../actions/routes.actions';
import {
  RoutesItem,
  RoutesItemByPath,
} from '../../admin/models/routes-item.interface';
import { Segments } from '../states/search.state';

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

  deleteRideById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteRideById),
      switchMap(({ routeId, rideId }) =>
        this.routesService.deleteRideById(routeId, rideId).pipe(
          map(() => deleteRideByIdSuccess({ routeId, rideId })),
          catchError((error) =>
            of(deleteRideByIdFailure({ error: error.message })),
          ),
        ),
      ),
    );
  });

  updateRideById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRideById),
      switchMap(({ routeId, rideId, segmentsByPath }) => {
        const segments: Segments[] =
          this.routesService.convertSegmentsToBase(segmentsByPath);

        return this.routesService
          .updateRideById(routeId, rideId, segments)
          .pipe(
            map(() =>
              updateRideByIdSuccess({
                routeId,
                rideId,
                segmentsByPath,
                segments,
              }),
            ),
            catchError((error) =>
              of(updateRideByIdFailure({ error: error.message })),
            ),
          );
      }),
    );
  });

  constructor(private routesService: RoutesService) {}
}

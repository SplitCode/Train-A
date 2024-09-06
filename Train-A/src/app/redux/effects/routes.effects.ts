import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap, tap, concatMap } from 'rxjs';
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
  loadRouteByIdSuccess,
  loadRouteById,
  loadRouteByPathSuccess,
  loadRouteByIdFailure,
  loadRouteByPathFailure,
  deleteRideByIdSuccess,
  deleteRideByIdFailure,
  deleteRideById,
  updateRideById,
  updateRideByIdFailure,
  updateRouteSuccess,
  updateRouteFailure,
  createRide,
  setRideFormVisible,
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

          // map(() => hideRideForm()),
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
          tap(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'The ride has been successfully deleted!',
            });
          }),
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
            tap(() => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'The ride has been successfully updated!',
              });
            }),

            map(() => loadRouteById({ routeId })),
            catchError((error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message || 'Unknown error',
              });
              return of(updateRideByIdFailure({ error: error.message }));
            }),
          );
      }),
    );
  });

  createRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createRide),
      switchMap(({ routeId, segmentsByPath }) => {
        const segments: Segments[] =
          this.routesService.convertSegmentsToBase(segmentsByPath);

        return this.routesService.createRide(routeId, segments).pipe(
          // eslint-disable-next-line @ngrx/no-multiple-actions-in-effects
          concatMap(() => [
            loadRouteById({ routeId }),
            setRideFormVisible({ visible: false }),
          ]),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message || 'Unknown error',
            });
            return of(updateRideByIdFailure({ error: error.message }));
          }),
        );
      }),
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

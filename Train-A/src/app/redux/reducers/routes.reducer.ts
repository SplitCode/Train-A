import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteRouteSuccess,
  hideRouteForm,
  loadRoutesSuccess,
  showRouteForm,
  loadRouteByIdSuccess,
  loadRouteByPathSuccess,
  deleteRideByIdSuccess,
  updateRideByIdSuccess,
} from '../actions/routes.actions';

import { RoutesState, initialRoutesState } from '../states/routes.state';

export const reducer = createReducer(
  initialRoutesState,
  on(
    loadRoutesSuccess,
    (state, { routes }): RoutesState => ({
      ...state,
      routes,
    }),
  ),
  on(
    deleteRouteSuccess,
    (state, { routeId }): RoutesState => ({
      ...state,
      routes: state.routes.filter((route) => route.id !== routeId),
    }),
  ),
  on(
    showRouteForm,
    (state, { mode }): RoutesState => ({
      ...state,
      formVisible: true,
      mode,
    }),
  ),
  on(
    hideRouteForm,
    (state): RoutesState => ({
      ...state,
      formVisible: false,
    }),
  ),
  on(
    loadRouteByIdSuccess,
    (state, { route }): RoutesState => ({
      ...state,
      route,
    }),
  ),
  on(
    loadRouteByPathSuccess,
    (state, { routeByPath }): RoutesState => ({
      ...state,
      routeByPath,
    }),
  ),
  on(
    deleteRideByIdSuccess,
    (state, { rideId }): RoutesState => ({
      ...state,
      route: {
        ...state.route!,
        schedule: state.route!.schedule.filter(
          (schedule) => schedule.rideId !== rideId,
        ),
      },
      routeByPath: {
        ...state.routeByPath!,
        schedule: state.routeByPath!.schedule.filter(
          (schedule) => schedule.rideId !== rideId,
        ),
      },
    }),
  ),
  on(
    updateRideByIdSuccess,
    (state, { rideId, segmentsByPath, segments }): RoutesState => ({
      ...state,
      route: {
        ...state.route!,
        schedule: state.route!.schedule.map((schedule) =>
          schedule.rideId === rideId ? { ...schedule, segments } : schedule,
        ),
      },
      routeByPath: {
        ...state.routeByPath!,
        schedule: state.routeByPath!.schedule.map((schedule) =>
          schedule.rideId === rideId
            ? { ...schedule, segmentsByPath }
            : schedule,
        ),
      },
    }),
  ),
);

export function routesReducer(state: RoutesState | undefined, action: Action) {
  return reducer(state, action);
}

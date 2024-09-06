import { Action, createReducer, on } from '@ngrx/store';
import {
  createRoute,
  createRouteFailure,
  createRouteSuccess,
  deleteRoute,
  deleteRouteFailure,
  deleteRouteSuccess,
  hideRouteForm,
  loadRoutesSuccess,
  routeModal,
  showRouteForm,
  loadRouteByIdSuccess,
  loadRouteByPathSuccess,
  deleteRideByIdSuccess,
  updateRideByIdSuccess,
  updateRouteSuccess,
  showRideForm,
  setRideFormVisible,
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
  on(deleteRoute, (state): RoutesState => {
    return {
      ...state,
    };
  }),
  on(
    deleteRouteSuccess,
    (state, { routeId }): RoutesState => ({
      ...state,
      routes: state.routes.filter((route) => route.id !== routeId),
    }),
  ),
  on(
    deleteRouteFailure,
    (state, { error }): RoutesState => ({
      ...state,
      error,
    }),
  ),
  on(createRoute, (state): RoutesState => {
    return {
      ...state,
    };
  }),
  on(
    createRouteSuccess,
    (state, {}): RoutesState => ({
      ...state,
    }),
  ),
  on(
    createRouteFailure,
    (state, { error }): RoutesState => ({
      ...state,
      error,
    }),
  ),
  on(updateRouteSuccess, (state, { route }) => {
    const routeIndex = state.routes.findIndex((r) => r.id === route.id);
    if (routeIndex !== -1) {
      const updatedRoutes = [...state.routes];
      updatedRoutes[routeIndex] = {
        ...updatedRoutes[routeIndex],
        ...route,
      };
      return {
        ...state,
        routes: updatedRoutes,
        routeId: null,
      };
    }
    return state;
  }),
  on(
    showRouteForm,
    (state, { routeId, mode }): RoutesState => ({
      ...state,
      formVisible: true,
      routeId: routeId,
      mode,
    }),
  ),
  on(
    hideRouteForm,
    (state): RoutesState => ({
      ...state,
      formVisible: false,
      routeId: null,
    }),
  ),
  on(
    routeModal,
    (state, { modalInfo }): RoutesState => ({
      ...state,
      modalInfo: modalInfo,
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
  on(
    showRideForm,
    (state, {}): RoutesState => ({
      ...state,
      rideFormVisible: true,
    }),
  ),

  on(
    hideRouteForm,
    (state): RoutesState => ({
      ...state,
      rideFormVisible: false,
    }),
  ),
  on(
    setRideFormVisible,
    (state, { visible }): RoutesState => ({
      ...state,
      rideFormVisible: visible,
    }),
  ),
);

export function routesReducer(state: RoutesState | undefined, action: Action) {
  return reducer(state, action);
}

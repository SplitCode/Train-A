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
  updateRouteSuccess,
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
);

export function routesReducer(state: RoutesState | undefined, action: Action) {
  return reducer(state, action);
}

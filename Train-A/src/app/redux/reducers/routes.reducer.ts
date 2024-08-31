import { Action, createReducer, on } from '@ngrx/store';
import {
  createRoute,
  createRouteFailure,
  createRouteSuccess,
  deleteRouteSuccess,
  hideRouteForm,
  loadRoutesSuccess,
  routeModal,
  showRouteForm,
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

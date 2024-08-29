import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteRouteSuccess,
  hideRouteForm,
  loadRoutesSuccess,
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
);

export function routesReducer(state: RoutesState | undefined, action: Action) {
  return reducer(state, action);
}

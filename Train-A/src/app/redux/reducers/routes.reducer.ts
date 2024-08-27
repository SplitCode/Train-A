import { Action, createReducer, on } from '@ngrx/store';
import {
  deleteRouteSuccess,
  loadRoutesSuccess,
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
  on(deleteRouteSuccess, (state, { routeId }) => ({
    ...state,
    routes: state.routes.filter((route) => route.id !== routeId),
  })),
);

export function routesReducer(state: RoutesState | undefined, action: Action) {
  return reducer(state, action);
}

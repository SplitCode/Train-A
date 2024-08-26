import { Action, createReducer, on } from '@ngrx/store';
import { loadRoutesSuccess } from '../actions/routes.actions';

import { RoutesState, initialRoutesState } from '../states/routes.state';

const reducer = createReducer(
  initialRoutesState,
  on(
    loadRoutesSuccess,
    (state, { routes }): RoutesState => ({
      ...state,
      routes,
    }),
  ),
);

export function routesReducer(state: RoutesState | undefined, action: Action) {
  return reducer(state, action);
}

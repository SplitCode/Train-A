import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RoutesState } from '../states/routes.state';

const selectRoutesState = createFeatureSelector<RoutesState>('routesState');

export const selectAllRoutes = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.routes,
);

export const selectRouteById = (routeId: number) =>
  createSelector(selectAllRoutes, (routes) =>
    routes.find((route) => route.id === routeId),
  );

export const selectRouteFormVisibility = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.formVisible,
);

export const selectRouteFormMode = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.mode,
);

export const selectRoute = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.route,
);

export const selectRouteByPath = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.routeByPath,
);
export const selectRouteId = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.routeId,
);

export const selectModalInfo = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.modalInfo,
);

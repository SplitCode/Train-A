import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RoutesState } from '../states/routes.state';
// import { RoutesItem } from '../../admin/models/routes-item.interface';

const selectRoutesState = createFeatureSelector<RoutesState>('routesState');

export const selectAllRoutes = createSelector(
  selectRoutesState,
  (state: RoutesState) => state.routes,
);

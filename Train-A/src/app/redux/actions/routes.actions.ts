import { createAction, props } from '@ngrx/store';
import { RoutesItem } from '../../admin/models/routes-item.interface';

export const loadRoutes = createAction('[Routes List] Load Routes');

export const loadRoutesSuccess = createAction(
  '[Routes List] Load Routes Success',
  props<{ routes: RoutesItem[] }>(),
);

export const loadRoutesFailure = createAction(
  '[Routes List] Load Routes Failure',
  props<{ error: string }>(),
);

export const deleteRoute = createAction(
  '[Routes Item] Delete Route',
  props<{ routeId: number }>(),
);

export const deleteRouteSuccess = createAction(
  '[Routes Item] Delete Route Success',
  props<{ routeId: number }>(),
);

export const deleteRouteFailure = createAction(
  '[Routes Item] Delete Route Failure',
  props<{ error: string }>(),
);

export const createRoute = createAction(
  '[Routes List] Create Route',
  props<{ route: RoutesItem }>(),
);

export const createRouteSuccess = createAction(
  '[Routes List] Create Route Success',
  props<{ route: RoutesItem }>(),
);

export const createRouteFailure = createAction(
  '[Routes List] Create Route Failure',
  props<{ error: string }>(),
);

export const updateRoute = createAction(
  '[Routes List] Update Route',
  props<{ route: RoutesItem }>(),
);

export const showRouteForm = createAction(
  '[Routes List] Show Route Form',
  props<{ mode: 'create' | 'update' }>(),
);

export const hideRouteForm = createAction('[Route] Hide Route Form');

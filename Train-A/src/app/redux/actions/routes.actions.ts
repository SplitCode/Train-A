import { createAction, props } from '@ngrx/store';
import {
  CreateRouteRequest,
  RoutesItem,
} from '../../admin/models/routes-item.interface';
import { ModalInfo } from '../states/routes.state';

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
  props<{ route: CreateRouteRequest }>(),
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
  props<{ id: number; route: { path: number[]; carriages: string[] } }>(),
);

export const updateRouteSuccess = createAction(
  '[Routes List] Update Route Success',
  props<{ route: RoutesItem }>(),
);

export const updateRouteFailure = createAction(
  '[Routes List] Update Route Failure',
  props<{ error: string }>(),
);

export const showRouteForm = createAction(
  '[Routes List] Show Route Form',
  props<{
    routeId: RoutesItem['id'] | null;
    mode: 'create' | 'update';
  }>(),
);

export const hideRouteForm = createAction('[Route] Hide Route Form');

export const routeModal = createAction(
  '[RouteModal] Route Modal',
  props<{ modalInfo: ModalInfo }>(),
);

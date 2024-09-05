import { createAction, props } from '@ngrx/store';
import {
  RoutesItem,
  RoutesItemByPath,
  CreateRouteRequest,
} from '../../admin/models/routes-item.interface';
import { Segments, SegmentsStation } from '../states/search.state';

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

export const loadRouteById = createAction(
  '[Routes List] Load Route By Id',
  props<{ routeId: number }>(),
);

export const loadRouteByIdSuccess = createAction(
  '[Routes List] Load Route By Id Success',
  props<{ route: RoutesItem }>(),
);

export const loadRouteByIdFailure = createAction(
  '[Routes List] Load Route By Id Failure',
  props<{ error: string }>(),
);

export const loadRouteByPath = createAction(
  '[Routes List] Load Route By Path',
  props<{ route: RoutesItem }>(),
);

export const loadRouteByPathSuccess = createAction(
  '[Routes List] Load Route By Path Success',
  props<{ routeByPath: RoutesItemByPath }>(),
);

export const loadRouteByPathFailure = createAction(
  '[Routes List] Load Route By Path Failure',
  props<{ error: string }>(),
);

export const deleteRideById = createAction(
  '[Routes List] Delete Ride By Id',
  props<{ routeId: number; rideId: number }>(),
);

export const deleteRideByIdSuccess = createAction(
  '[Routes List] Delete Ride By Id Success',
  props<{ routeId: number; rideId: number }>(),
);

export const deleteRideByIdFailure = createAction(
  '[Routes List] Delete Ride By Id Failure',
  props<{ error: string }>(),
);

export const createRide = createAction(
  '[Routes List] Create Ride By Id',
  props<{ routeId: number; segmentsByPath: SegmentsStation[] }>(),
);

export const createRideSuccess = createAction(
  '[Routes List] Create Ride By Id Success',
  props<{ routeId: number; segments: Segments[] }>(),
);

export const createRideFailure = createAction(
  '[Routes List] Create Ride By Id Failure',
  props<{ error: string }>(),
);

export const updateRideById = createAction(
  '[Routes List] Update Ride By Id',
  props<{
    routeId: number;
    rideId: number;
    segmentsByPath: SegmentsStation[];
  }>(),
);

export const updateRideByIdSuccess = createAction(
  '[Routes List] Update Ride By Id Success',
  props<{
    routeId: number;
    rideId: number;
    segmentsByPath: SegmentsStation[];
    segments: Segments[];
  }>(),
);

export const updateRideByIdFailure = createAction(
  '[Routes List] Update Ride By Id Failure',
  props<{ error: string }>(),
);

export const showRideForm = createAction('[Ride List] Show  Ride Form');

export const hideRideForm = createAction('[Ride List] Hide Ride Form');

export const hideRouteForm = createAction('[Route] Hide Route Form');

export const routeModal = createAction(
  '[RouteModal] Route Modal',
  props<{ modalInfo: ModalInfo }>(),
);

import { createAction, props } from '@ngrx/store';
import {
  RoutesItem,
  RoutesItemByPath,
} from '../../admin/models/routes-item.interface';
import { Segments, SegmentsStation } from '../states/search.state';

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

export const loadRouteById = createAction(
  '[Routes List] Load Route By Id',
  props<{ routeId: string }>(),
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

export const createRideById = createAction(
  '[Routes List] Create Ride By Id',
  props<{ routeId: number; segmentsByPath: Segments[] }>(),
);

export const createRideByIdSuccess = createAction(
  '[Routes List] Create Ride By Id Success',
  props<{ routeId: number; segments: Segments[] }>(),
);

export const createRideByIdFailure = createAction(
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

export const hideRouteForm = createAction('[Route] Hide Route Form');

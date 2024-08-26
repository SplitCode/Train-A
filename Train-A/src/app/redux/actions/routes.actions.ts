import { createAction, props } from '@ngrx/store';
import { RoutesItem } from '../../admin/models/routes-item.interface';

export const loadRoutes = createAction('[Routes List] Load Routes');

export const loadRoutesSuccess = createAction(
  '[Routes List] Load Routes Success',
  props<{ routes: RoutesItem[] }>(),
);

export const loadRoutesFailure = createAction(
  '[Routes List] Load Routes Failure',
  props<{ error: unknown }>(),
);

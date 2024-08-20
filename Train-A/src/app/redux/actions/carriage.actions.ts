import { createAction, props } from '@ngrx/store';
import { CarriageItem } from '../../admin/models/carriage-item.interface';

export const loadCarriages = createAction('[Carriage List] Load Carriages');
export const loadCarriagesSuccess = createAction(
  '[Carriage List] Load Carriages Success',
  props<{ carriages: CarriageItem[] }>(),
);
export const loadCarriagesFailure = createAction(
  '[Carriage List] Load Carriages Failure',
  props<{ error: unknown }>(),
);

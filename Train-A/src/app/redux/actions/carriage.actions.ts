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
export const updateCarriage = createAction(
  '[Carriage List] Update Carriage',
  props<{
    updatedCarriage: CarriageItem;
  }>(),
);
export const createCarriage = createAction(
  '[Carriage List] Create Carriage',
  props<{ createdCarriage: CarriageItem }>(),
);
export const createCarriageSuccess = createAction(
  '[Carriage List] Create Carriage Success',
  props<{ carriage: CarriageItem }>(),
);

export const createCarriageFailure = createAction(
  '[Carriage List] Create Carriage Failure',
  props<{ error: unknown }>(),
);
export const showCarriageForm = createAction(
  '[Carriage List] Show Carriage Form',
  props<{
    carriageCode: CarriageItem['code'] | null;
    mode: 'create' | 'update';
  }>(),
);

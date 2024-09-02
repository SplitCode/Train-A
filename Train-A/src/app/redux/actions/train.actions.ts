import { createAction, props } from '@ngrx/store';
import { CarriageItem } from '../../admin/models/carriage-item.interface';

export const updateTrainArray = createAction(
  '[Train] Update Train Array',
  props<{ carriageCodes: { code: string; carriageNumber: number }[] }>(),
);
export const updateTrainArraySuccess = createAction(
  '[Train] Update Train Array Success',
  props<{ trainArray: CarriageItem[] }>(),
);

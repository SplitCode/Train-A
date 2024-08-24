import { CarriageItem } from '../../admin/models/carriage-item.interface';

export interface CarriageState {
  carriages: CarriageItem[];
  formVisibleForCarriageCode: string | null;
  mode: 'create' | 'update';
}

export const initialCarriageState: CarriageState = {
  carriages: [],
  formVisibleForCarriageCode: null,
  mode: 'create',
};

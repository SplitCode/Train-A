import { CarriageItem } from '../../admin/models/carriage-item.interface';

export interface CarriageState {
  carriages: CarriageItem[];
  formVisibleForCarriageCode: string | null;
}

export const initialCarriageState: CarriageState = {
  carriages: [],
  formVisibleForCarriageCode: null,
};

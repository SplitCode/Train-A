import { CarriageItem } from '../../admin/models/carriage-item.interface';

export interface CarriageState {
  carriages: CarriageItem[];
}

export const initialCarriageState: CarriageState = {
  carriages: [],
};

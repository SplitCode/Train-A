import { CarriageItem } from '../../admin/models/carriage-item.interface';

export interface TrainState {
  trainArray: CarriageItem[];
}
export const initialState: TrainState = {
  trainArray: [],
};

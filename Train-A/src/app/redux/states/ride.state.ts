import { CarriageItem } from '../../admin/models/carriage-item.interface';
import { RideResponse } from '../../home/models/ride-response.interface';

export interface RideState {
  rideInfo: RideResponse | null;
  filteredCarriages: CarriageItem[];
  error: unknown;
}

export const initialState: RideState = {
  rideInfo: null,
  filteredCarriages: [],
  error: null,
};

import { CarriageItem } from '../../admin/models/carriage-item.interface';
import { RideResponse } from '../../order/models/ride-response.interface';
import { StationsItem } from './stations.state';

export interface RideState {
  rideInfo: RideResponse | null;
  carriages: CarriageItem[];
  stations: StationsItem[];
  error: unknown;
}

export const initialState: RideState = {
  rideInfo: null,
  carriages: [],
  stations: [],
  error: null,
};

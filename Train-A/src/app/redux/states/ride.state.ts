import { RideResponse } from '../../order/models/ride-response.interface';

export interface RideState {
  rideInfo: RideResponse | null;
  error: unknown;
}

export const initialState: RideState = {
  rideInfo: null,
  error: null,
};

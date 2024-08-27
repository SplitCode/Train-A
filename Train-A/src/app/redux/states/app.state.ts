import { CarriageState } from './carriage.state';
import { RideState } from './ride.state';
import { StationsState } from './stations.state';
import { UserState } from './user.state';

export interface AppState {
  userState: UserState;
  carriageState: CarriageState;
  stationsState: StationsState;
  rideState: RideState;
}

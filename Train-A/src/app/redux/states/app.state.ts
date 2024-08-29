import { CarriageState } from './carriage.state';
import { RideState } from './ride.state';
import { SearchState } from './search.state';
import { StationsState } from './stations.state';
import { RoutesState } from './routes.state';
import { UserState } from './user.state';

export interface AppState {
  userState: UserState;
  carriageState: CarriageState;
  stationsState: StationsState;
  rideState: RideState;
  searchState: SearchState;
  routesState: RoutesState;
}

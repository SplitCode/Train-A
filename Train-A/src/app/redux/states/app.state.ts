import { CarriageState } from './carriage.state';
import { StationsState } from './stations.state';
import { RoutesState } from './routes.state';
import { UserState } from './user.state';

export interface AppState {
  userState: UserState;
  carriageState: CarriageState;
  stationsState: StationsState;
  routesState: RoutesState;
}

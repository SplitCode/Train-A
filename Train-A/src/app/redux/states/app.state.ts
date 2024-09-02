import { CarriageState } from './carriage.state';
import { RideState } from './ride.state';
import { SearchState } from './search.state';
import { StationsState } from './stations.state';
import { RoutesState } from './routes.state';
import { UserState } from './user.state';
import { OrderState } from './order.state';
import { TrainState } from './train.state';

export interface AppState {
  userState: UserState;
  carriageState: CarriageState;
  stationsState: StationsState;
  rideState: RideState;
  searchState: SearchState;
  routesState: RoutesState;
  orderState: OrderState;
  trainState: TrainState;
}

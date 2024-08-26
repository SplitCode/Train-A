import { CarriageState } from './carriage.state';
import { RoutesState } from './routes.state';
import { UserState } from './user.state';

export interface AppState {
  userState: UserState;
  carriageState: CarriageState;
  routesState: RoutesState;
}

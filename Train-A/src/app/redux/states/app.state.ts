import { CarriageState } from './carriage.state';
import { UserState } from './user.state';

export interface AppState {
  userState: UserState;
  carriageState: CarriageState;
}

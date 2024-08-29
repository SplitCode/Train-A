import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { userReducer } from './user.reducer';
import { actionStateLogger } from '../meta-reducers/action-state-logger.reducer';
import { carriageReducer } from './carriage.reducer';
import { stationsReducer } from './stations.reducer';
import { rideReducer } from './ride.reducer';
import { searchReducer } from './search.reducer';
import { routesReducer } from './routes.reducer';

export const indexReducer: ActionReducerMap<AppState> = {
  userState: userReducer,
  carriageState: carriageReducer,
  stationsState: stationsReducer,
  rideState: rideReducer,
  searchState: searchReducer,
  routesState: routesReducer,
};
export const metaReducers: MetaReducer<AppState>[] = [actionStateLogger];

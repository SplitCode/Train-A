import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { userReducer } from './user.reducer';
import { actionStateLogger } from '../meta-reducers/action-state-logger.reducer';
import { carriageReducer } from './carriage.reducer';
import { stationsReducer } from './stations.reducer';
import { routesReducer } from './routes.reducer';

export const indexReducer: ActionReducerMap<AppState> = {
  userState: userReducer,
  carriageState: carriageReducer,
  stationsState: stationsReducer,
  routesState: routesReducer,
};
export const metaReducers: MetaReducer<AppState>[] = [actionStateLogger];

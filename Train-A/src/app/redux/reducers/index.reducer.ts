import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { userReducer } from './user.reducer';
import { actionStateLogger } from '../meta-reducers/action-state-logger';

export const indexReducer: ActionReducerMap<AppState> = {
  userState: userReducer,
};
export const metaReducers: MetaReducer<AppState>[] = [actionStateLogger];

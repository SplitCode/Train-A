import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from '../states/user.state';
import { setUserRole } from '../actions/user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(setUserRole, (state, { userRole }): UserState => ({ ...state, userRole })),
);

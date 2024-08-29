import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from '../states/user.state';
import {
  setUserRole,
  setUserData,
  resetUserData,
} from '../actions/user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(setUserRole, (state, { userRole }): UserState => ({ ...state, userRole })),
  on(
    setUserData,
    (state, { name, email }): UserState => ({
      ...state,
      name,
      email,
    }),
  ),
  // on(
  //   getUserData,
  //   (state, { userData }): UserState => ({
  //     ...state,
  //     userData,
  //   }),
  // ),
  on(
    resetUserData,
    (state): UserState => ({
      ...state,
      name: '',
      email: '',
    }),
  ),
);

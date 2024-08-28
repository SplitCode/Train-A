import { createAction, props } from '@ngrx/store';
import { UserRole, UserState } from '../states/user.state';

export const setUserRole = createAction(
  '[User] Set User Role',
  props<{ userRole: UserRole }>(),
);

export const setUserData = createAction(
  '[User] Set User Data',
  props<{
    name: string;
    email: string;
  }>(),
);

export const getUserData = createAction('[User] Get User Data');

export const resetUserData = createAction(
  '[User] Reset User Data',
  props<{ UserState: UserState }>(),
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../states/user.state';

export const selectUserState = createFeatureSelector<UserState>('userState');

export const selectUserRole = createSelector(
  selectUserState,
  (state: UserState) => {
    return state.userRole;
  },
);

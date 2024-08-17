import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRole, UserState } from '../states/user.state';

export const selectUserState = createFeatureSelector<UserState>('userState');

export const selectUserRole = createSelector(
  selectUserState,
  (state: UserState) => state.userRole,
);

export const selectIsManager = createSelector(
  selectUserState,
  (state: UserState) => {
    const isManager = state.userRole === UserRole.Manager;
    console.log(`selectIsManager: ${isManager}`);
    return isManager;
  },
);

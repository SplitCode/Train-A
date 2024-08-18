import { createAction, props } from '@ngrx/store';
import { UserRole } from '../states/user.state';

export const setUserRole = createAction(
  '[User] Set User Role',
  props<{ userRole: UserRole }>(),
);

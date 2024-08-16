import { createAction, props } from '@ngrx/store';

export const setUserRole = createAction(
  '[User] Set User Role',
  props<{ userRole: 'Guest' | 'GeneralUser' | 'Manager' }>(),
);

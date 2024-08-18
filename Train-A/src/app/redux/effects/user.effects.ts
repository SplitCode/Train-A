import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setUserRole } from '../actions/user.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);

  setUserRole$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setUserRole),
        tap((action) => {
          console.log('User role:', action.userRole);
        }),
      );
    },
    { dispatch: false },
  );
}

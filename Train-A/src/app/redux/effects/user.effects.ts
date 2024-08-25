import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setUserRole } from '../actions/user.actions';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { appInit } from '../actions/app.actions';

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

  appInit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appInit),
      map(() => {
        const role = this.authService.getUserRole();
        return setUserRole({ userRole: role });
      }),
    );
  });

  constructor(private authService: AuthService) {}
}

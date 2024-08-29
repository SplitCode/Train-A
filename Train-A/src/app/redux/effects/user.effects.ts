import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setUserRole, setUserData, getUserData } from '../actions/user.actions';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { appInit } from '../actions/app.actions';
import { ProfileService } from '../../profile/services/profile.service';

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

  getUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserData),
      mergeMap(() => {
        return this.profileService.getProfileData().pipe(
          map((response) => {
            return setUserData({ name: response.name, email: response.email });
          }),
        );
      }),
    );
  });

  setUserData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setUserData),
        tap((action) => {
          return setUserData({ name: action.name, email: action.email });
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {}
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthRequest, AuthResponse, ServerError } from '../interfaces/auth';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { UserRole } from '../../redux/states/user.state';
import { Store } from '@ngrx/store';
import { setUserRole } from '../../redux/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly token = 'Ateam-token';

  private isAuth$$ = new BehaviorSubject<boolean>(this.checkAuth());

  public isAuth$ = this.isAuth$$.asObservable();

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  public signUp(user: AuthRequest): Observable<void> {
    return this.http.post<void>(API_CONFIG.signUpUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleServerError(error));
      }),
    );
  }

  public signIn(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(API_CONFIG.signInUrl, user).pipe(
      tap((response) => {
        localStorage.setItem(this.token, response.token);
        const role =
          user.email === 'admin@admin.com' && user.password === 'my-password'
            ? UserRole.Manager
            : UserRole.GeneralUser;
        localStorage.setItem('user-role', role);
        this.store.dispatch(setUserRole({ userRole: role }));
        this.isAuth$$.next(true);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleServerError(error));
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem(this.token);
    localStorage.setItem('user-role', UserRole.Guest);
    this.store.dispatch(setUserRole({ userRole: UserRole.Guest }));
    this.isAuth$$.next(false);
  }

  public checkAuth(): boolean {
    return !!localStorage.getItem(this.token);
  }

  private handleServerError(error: HttpErrorResponse): ServerError {
    const errors: ServerError = {};

    if (error.error instanceof ErrorEvent) {
      errors.general = `Error: ${error.error.message}`;
    } else {
      switch (error.error.reason) {
        case 'invalidEmail':
          errors.email = 'Email is wrong';
          break;
        case 'invalidPassword':
          errors.password = 'Password is wrong';
          break;
        case 'invalidUniqueKey':
          errors.email = 'Account with this email already exists';
          break;
        case 'userNotFound':
          errors.email = 'Incorrect email or password';
          errors.password = 'Incorrect email or password';
          break;
        case 'alreadyLoggedIn':
          errors.general = 'Already logged in';
          break;
        case 'invalidFields':
          errors.general = 'Fields are empty';
          break;
        default:
          errors.general = `Error: ${error.error.message}`;
      }
    }

    return errors;
  }
}

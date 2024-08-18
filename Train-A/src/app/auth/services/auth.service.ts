import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthRequest, ServerError } from '../interfaces/auth';
import { catchError, Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public signUp(user: AuthRequest): Observable<void> {
    return this.http.post<void>(API_CONFIG.signUpUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      }),
    );
  }

  private handleError(error: HttpErrorResponse): ServerError {
    const errors: ServerError = {};

    if (error.error instanceof ErrorEvent) {
      errors.general = `Error: ${error.error.message}`;
    } else {
      switch (error.error.reason) {
        case 'invalidFields':
          errors.general = 'Fields are empty';
          break;
        case 'invalidEmail':
          errors.email = 'Email is wrong';
          break;
        case 'invalidPassword':
          errors.password = 'Password is wrong';
          break;
        case 'invalidUniqueKey':
          errors.email = 'User already exists';
          break;
        default:
          errors.general = `Error: ${error.error.message}`;
      }
    }

    return errors;
  }
}

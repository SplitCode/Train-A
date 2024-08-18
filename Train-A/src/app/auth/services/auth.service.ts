import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignUpRequest } from '../interfaces/auth';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = '/api/signup';

  public signUp(user: SignUpRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      }),
    );
  }

  private handleError(error: HttpErrorResponse): Error {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.error.reason) {
        case 'invalidFields':
          errorMessage = 'Fields are empty';
          break;
        case 'invalidEmail':
          errorMessage = 'Email is wrong';
          break;
        case 'invalidPassword':
          errorMessage = 'Password is wrong';
          break;
        case 'invalidUniqueKey':
          errorMessage = 'User already exists';
          break;
        default:
          errorMessage = `Error: ${error.error.message}`;
      }
    }

    return new Error(errorMessage);
  }
}

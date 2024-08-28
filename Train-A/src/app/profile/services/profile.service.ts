import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Store } from '@ngrx/store';
import { UserState } from '../../redux/states/user.state';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userDataSource$ = signal<Partial<UserState>>({
    name: '',
    email: '',
  });

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  public setUserDataInLocalStorage(userData: UserState): void {
    localStorage.setItem('user-data', JSON.stringify(userData));
  }

  public getProfileData(): Observable<UserState> {
    return this.http.get<UserState>(API_CONFIG.profileUrl).pipe(
      tap((response) => {
        this.userDataSource$.set(response);
        this.setUserDataInLocalStorage(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => console.log('Error:', error));
      }),
    );
  }

  public updateProfileData(
    userData: Partial<UserState>,
  ): Observable<UserState> {
    return this.http.put<UserState>(API_CONFIG.profileUrl, userData).pipe(
      tap((response) => {
        this.userDataSource$.set(response);
        this.setUserDataInLocalStorage(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => console.log('Error:', error));
      }),
    );
  }

  public resetUserData(): void {
    this.userDataSource$.set({
      name: '',
      email: '',
    });
    localStorage.removeItem('user-data');
  }

  public updatePassword(password: string): Observable<void> {
    return this.http.put<void>(API_CONFIG.passwordUrl, { password }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => console.log('Error:', error));
      }),
    );
  }
}

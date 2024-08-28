import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { Store } from '@ngrx/store';
import { UserState } from '../../redux/states/user.state';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private $$userDataSource = new BehaviorSubject<UserState | null>(null);

  $userDataSource = this.$$userDataSource.asObservable();

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
        this.$$userDataSource.next(response);
        this.setUserDataInLocalStorage(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => console.log('Error:', error));
      }),
    );
  }
}

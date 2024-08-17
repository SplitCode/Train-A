import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectIsManager } from '../../redux/selectors/user.selectors';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store,
    private messageService: MessageService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsManager).pipe(
      tap((isManager) => {
        if (!isManager) {
          this.messageService.add({
            severity: 'error',
            summary: 'Access Denied',
            detail: 'You must be a Administrator to access this page',
          });
        }
      }),
    );
  }
}

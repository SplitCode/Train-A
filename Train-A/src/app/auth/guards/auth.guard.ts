// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private messageService: MessageService,
  ) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('Ateam-token');
    if (!token) {
      return of(true);
    } else {
      this.router.navigate(['/']);
      return of(false);
    }
  }
}

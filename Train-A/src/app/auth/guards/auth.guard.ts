import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    const isAuth = this.authService.checkAuth();
    console.log(
      `Authorization status: ${isAuth ? 'Authorized' : 'Unauthorized'}`,
    );
    const targetUrl = state.url;

    if (!isAuth) {
      if (targetUrl === '/signin' || targetUrl === '/signup') {
        return of(true);
      } else {
        this.router.navigate(['/']);
        return of(false);
      }
    } else {
      if (targetUrl === '/signin' || targetUrl === '/signup') {
        this.router.navigate(['/']);
        return of(false);
      } else {
        return of(true);
      }
    }
  }
}

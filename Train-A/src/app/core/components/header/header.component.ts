import { PRIME_NG_MODULES } from './../../../shared/modules/prime-ng-modules';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUserRole } from '../../../redux/selectors/user.selectors';
import { setUserRole } from '../../../redux/actions/user.actions';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { Router, RouterModule } from '@angular/router';
import { UserRole } from '../../../redux/states/user.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonComponent,
    RouterModule,
    PRIME_NG_MODULES.ToolbarModule,
    PRIME_NG_MODULES.SplitButtonModule,
    PRIME_NG_MODULES.InputTextModule,
    PRIME_NG_MODULES.DropdownModule,
  ],
})
export class HeaderComponent implements OnInit {
  public userRole$: Observable<'Guest' | 'GeneralUser' | 'Manager'> =
    of('Manager');

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.userRole$ = this.store.select(selectUserRole);
  }

  // Samle to show how to switch (will delete)
  public setRole(role: UserRole) {
    this.store.dispatch(setUserRole({ userRole: role }));
  }

  public isActiveRoute(route: string): boolean {
    const activeRoute = this.router.url.split('/')[1];

    return activeRoute === route.split('/')[1];
  }

  public isGeneralUserOrManager(userRole: string): boolean {
    return userRole === 'GeneralUser' || userRole === 'Manager';
  }

  public isManager(userRole: string): boolean {
    return userRole === 'Manager';
  }

  public isGuest(userRole: string): boolean {
    return userRole === 'Guest';
  }
}

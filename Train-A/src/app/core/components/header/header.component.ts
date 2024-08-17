import { PRIME_NG_MODULES } from './../../../shared/modules/prime-ng-modules';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUserRole } from '../../../redux/selectors/user.selectors';
import { setUserRole } from '../../../redux/actions/user.actions';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { RouterModule } from '@angular/router';

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
  ],
})
export class HeaderComponent implements OnInit {
  userRole$: Observable<'Guest' | 'GeneralUser' | 'Manager'> = of('Manager');

  constructor(private store: Store) {}

  ngOnInit() {
    this.userRole$ = this.store.select(selectUserRole);
  }

  // Samle to show me how to switch (will delete)
  setRole(role: 'Guest' | 'GeneralUser' | 'Manager') {
    this.store.dispatch(setUserRole({ userRole: role }));
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUserRole } from '../../../redux/selectors/user.selectors';
import { setUserRole } from '../../../redux/actions/user.actions';
import { CommonModule } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextModule,
    CustomButtonComponent,
    RouterModule,
    ButtonModule,
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

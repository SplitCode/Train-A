import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectUserRole } from '../../../redux/selectors/user.selectors';
import { setUserRole } from '../../../redux/actions/user.actions';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, CustomButtonComponent],
})
export class HeaderComponent implements OnInit {
  userRole$: Observable<'Guest' | 'GeneralUser' | 'Manager'> = of('Guest');

  constructor(private store: Store) {}

  ngOnInit() {
    this.userRole$ = this.store.select(selectUserRole);
  }

  setRole(role: 'Guest' | 'GeneralUser' | 'Manager') {
    this.store.dispatch(setUserRole({ userRole: role }));
  }
}

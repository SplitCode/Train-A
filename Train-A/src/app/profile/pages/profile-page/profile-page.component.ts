import { Component, OnInit, Signal } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { CustomValidationInfoComponent } from '../../../shared/components/custom-validation-info/custom-validation-info.component';
import {
  CustomButtonComponent,
  InputComponent,
} from '../../../shared/components';
import { ServerError } from '../../../auth/interfaces/auth';
import { MessageService } from 'primeng/api';

import { EditFieldComponent } from '../../components/edit-field/edit-field.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
import { selectUserData } from '../../../redux/selectors/user.selectors';
import { UserState } from '../../../redux/states/user.state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProfileService } from '../../services/profile.service';
import { getUserData, setUserData } from '../../../redux/actions/user.actions';
// import { getUserData } from '../../../redux/actions/user.actions';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    ReactiveFormsModule,
    CustomValidationInfoComponent,
    CustomButtonComponent,
    RouterModule,
    CommonModule,
    EditFieldComponent,
    InputComponent,
    ChangePasswordComponent,
  ],
})
export class ProfilePageComponent implements OnInit {
  UpdateUserDataForm!: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  public user$: Signal<UserState>;

  ngOnInit() {
    this.store.dispatch(getUserData());
  }

  public onSubmit() {
    this.submitted = true;
    if (this.UpdateUserDataForm.valid) {
      this.isSubmitting = true;
      this.profileService
        .updateProfileData(this.UpdateUserDataForm.value)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User data updated!',
            });
            this.store.dispatch(
              setUserData({
                name: response.name,
                email: response.email,
              }),
            );
          },
          error: (err: ServerError) => {
            this.isSubmitting = false;
            Object.keys(err).forEach((key) => {
              if (key === 'general') {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: err[key],
                });
              } else {
                this.UpdateUserDataForm.get(key)?.setErrors({
                  serverError: err[key as keyof ServerError],
                });
              }
            });
          },
          complete: () => {
            this.isSubmitting = false;
          },
        });
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private messageService: MessageService,
    private profileService: ProfileService,
  ) {
    this.user$ = toSignal(
      this.store.select(selectUserData),
    ) as Signal<UserState>;

    this.UpdateUserDataForm = this.fb.group({
      name: ['', [(Validators.required, Validators.minLength(3))]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
        ],
      ],
    });

    toObservable(this.user$).subscribe((user: UserState) => {
      if (user) {
        this.UpdateUserDataForm.patchValue({
          name: user.name,
          email: user.email,
        });
      }
    });
  }
}

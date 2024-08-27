import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import {
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

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  standalone: true,
  imports: [
    InputTextModule,
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
  public signUpForm: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  public user = {
    email: 'email@em.ru ',
    name: 'Natalia',
  };

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
        ],
      ],
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.signUpForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
        ],
      ],
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.isSubmitting = true;
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Register successfully!',
          });
          this.router.navigate(['/signin']);
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
              this.signUpForm
                .get(key)
                ?.setErrors({ serverError: err[key as keyof ServerError] });
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
}

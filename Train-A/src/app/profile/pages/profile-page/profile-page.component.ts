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
import {
  noWhitespaceValidator,
  passwordsMatchValidator,
} from '../../../shared/directives/password-validation.directive';
import { ServerError } from '../../../auth/interfaces/auth';
import { MessageService } from 'primeng/api';

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
    InputComponent,
  ],
})
export class ProfilePageComponent implements OnInit {
  public signUpForm: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
          ],
        ],
        passwordField: ['', [noWhitespaceValidator(), Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator },
    );
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.signUpForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
          ],
        ],
        password: ['', [noWhitespaceValidator(), Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator },
    );
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

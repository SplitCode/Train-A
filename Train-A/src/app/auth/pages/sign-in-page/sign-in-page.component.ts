import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ServerError } from '../../interfaces/auth';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { noWhitespaceValidator } from '../../../shared/directives/password-validation.directive';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    PasswordModule,
    CustomButtonComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  signInForm: FormGroup;

  submitted = false;

  isSubmitting = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.signInForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\d_]+@[\w\d_]+\.\w{2,7}$/),
        ],
      ],
      password: ['', [noWhitespaceValidator()]],
    });

    this.signInForm.get('email')?.valueChanges.subscribe(() => {
      this.clearServerErrors();
    });

    this.signInForm.get('password')?.valueChanges.subscribe(() => {
      this.clearServerErrors();
    });
  }

  clearServerErrors() {
    if (this.signInForm.get('email')?.hasError('serverError')) {
      this.signInForm.get('email')?.setErrors(null);
    }
    if (this.signInForm.get('password')?.hasError('serverError')) {
      this.signInForm.get('password')?.setErrors(null);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.signInForm.valid) {
      this.isSubmitting = true;
      this.authService.signIn(this.signInForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Authorization successfully!',
          });
          this.router.navigate(['/home']);
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
              this.signInForm
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
}

import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomValidationInfoComponent } from '../../../shared/components/custom-validation-info/custom-validation-info.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import {
  noWhitespaceValidator,
  passwordsMatchValidator,
} from '../../../shared/directives/password-validation.directive';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ServerError } from '../../interfaces/auth';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputTextModule,
    CardModule,
    PasswordModule,
    TooltipModule,
    ReactiveFormsModule,
    CustomValidationInfoComponent,
    CustomButtonComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  public signUpForm: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  constructor(
    private router: Router,
    private authService: AuthService,
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
}

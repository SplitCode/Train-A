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
import { passwordsMatchValidator } from '../../../shared/directives/password-match.directive';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    CustomValidationInfoComponent,
    CustomButtonComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent {
  signUpForm: FormGroup;

  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator },
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful!',
          });
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          if (err.message === 'User already exists') {
            this.signUpForm.get('email')?.setErrors({ emailExists: true });
          } else {
            console.log(err.message);
          }
        },
      });
    }
  }
}

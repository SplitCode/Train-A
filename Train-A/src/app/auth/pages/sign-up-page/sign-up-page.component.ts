import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
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

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
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

  private router = inject(Router);

  private fb = inject(FormBuilder);

  constructor() {
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
      // this.authService.signUp(this.signUpForm.value).subscribe(...)
      this.router.navigate(['/signin']);
      // this.authService.signUp(this.signUpForm.value).subscribe(
      //   response => {
      //     this.router.navigate(['/signin']);
      //   },
      //   error => {
      //     if (error.status === 400 && error.error.reason === 'invalidUniqueKey') {
      //       this.signUpForm.get('email')?.setErrors({ emailExists: true });
      //     }
      //   }
      // );
    }
  }
}

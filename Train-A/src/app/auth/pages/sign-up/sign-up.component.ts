import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidationInfoComponent } from '../../../shared/components/custom-validation-info/custom-validation-info.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

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
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm: FormGroup;

  private router = inject(Router);

  private fb = inject(FormBuilder);

  constructor() {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator },
    );
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
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

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
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-change-password',
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
    DialogModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  public signUpForm: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        password: ['', [noWhitespaceValidator(), Validators.minLength(8)]],
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
        password: ['', [noWhitespaceValidator(), Validators.minLength(8)]],
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

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}

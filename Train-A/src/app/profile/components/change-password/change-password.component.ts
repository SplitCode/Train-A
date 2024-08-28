import { Component, OnInit } from '@angular/core';
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
import { ProfileService } from '../../services/profile.service';

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
  public passwordForm: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  ngOnInit() {}

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.passwordForm = this.fb.group(
      {
        password: [
          'qwerty123',
          [noWhitespaceValidator(), Validators.minLength(8)],
        ],
      },
      { validators: passwordsMatchValidator },
    );
  }

  public onSubmit() {
    this.submitted = true;
    if (this.passwordForm.valid) {
      this.isSubmitting = true;
      this.profileService
        .updatePassword(this.passwordForm.value.password)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password updated!',
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
                this.passwordForm
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

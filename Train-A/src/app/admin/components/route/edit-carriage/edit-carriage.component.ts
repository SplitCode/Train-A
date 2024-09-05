import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  CustomButtonComponent,
  InputComponent,
} from '../../../../shared/components';

@Component({
  selector: 'app-edit-carriage',
  standalone: true,
  imports: [
    CustomButtonComponent,
    InputComponent,
    CommonModule,
    ReactiveFormsModule,
  ],

  templateUrl: './edit-carriage.component.html',
  styleUrl: './edit-carriage.component.scss',
})

//
export class EditCarriageComponent implements OnInit {
  @Input() price!: FormGroup;

  @Input() inValidate: boolean = false;
  // formGroup!: FormGroup;

  @Input() formGroupName!: string;

  @Input() parentFormGroup!: FormGroup;

  @Input() formGroup!: FormGroup;

  // editMode = false;
  editMode = true;

  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  // get control() {
  //   return this.formGroup?.get(this.formControlName);
  // }

  getFormGroup() {
    return this.parentFormGroup.get(this.formGroupName) as FormGroup;
  }

  ngOnInit() {
    if (!this.formGroup) this.formGroup = this.formGroupDirective.control;
  }

  toggleEditMode() {
    if (this.inValidate !== true) {
      this.editMode = !this.editMode;
    }
  }
}

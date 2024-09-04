/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  CustomButtonComponent,
  InputComponent,
} from '../../../../shared/components';

@Component({
  selector: 'app-edit-time',
  standalone: true,
  imports: [CustomButtonComponent, InputComponent, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditTimeComponent),
      multi: true,
    },
  ],
  templateUrl: './edit-time.component.html',
  styleUrl: './edit-time.component.scss',
})
export class EditTimeComponent implements OnInit, ControlValueAccessor {
  @Input() time!: { departure: string | null; arrival: string | null };

  @Input() value: string = '';
  @Input() formControlName!: string;

  @Input() inValidate!: boolean;

  @Output() clickEmitter = new EventEmitter<void>();

  onClick() {
    this.clickEmitter.emit();
  }

  formGroup!: FormGroup;

  editMode = false;
  // editMode = true;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if needed
  }

  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  get control() {
    return this.formGroup?.get(this.formControlName);
  }

  ngOnInit() {
    this.formGroup = this.formGroupDirective.control;
  }

  toggleEditMode() {
    if (this.inValidate !== true) {
      this.editMode = !this.editMode;
    }
  }
}

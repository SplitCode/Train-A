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
} from '../../../shared/components';

@Component({
  selector: 'app-edit-field',
  standalone: true,
  imports: [CustomButtonComponent, InputComponent, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './edit-field.component.html',
  styleUrl: './edit-field.component.scss',
})
export class EditFieldComponent implements OnInit, ControlValueAccessor {
  @Input() type: string = 'text';

  @Input() placeholder!: string;

  @Input() disabled = false;

  @Input() classList!: string;

  @Input() style!: string;

  @Input() required: boolean = true;

  @Input() label!: string;

  @Input() formControlName!: string;

  @Input() tooltip!: string;

  @Input() value: string = '';

  @Output() clickEmitter = new EventEmitter<void>();

  onClick() {
    this.clickEmitter.emit();
  }

  formGroup!: FormGroup;

  editMode = false;

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
    this.editMode = !this.editMode;
  }
}

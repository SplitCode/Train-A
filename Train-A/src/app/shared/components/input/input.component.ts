/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';

import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import {
  ControlValueAccessor,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    TooltipModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  standalone: true,
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit, ControlValueAccessor {
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

  @Input() formGroup!: FormGroup;

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
    if (!this.formGroup) this.formGroup = this.formGroupDirective.control;
  }
}

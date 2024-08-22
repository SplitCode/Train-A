import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stations-form',
  standalone: true,
  imports: [CustomButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './stations-form.component.html',
  styleUrl: './stations-form.component.scss',
})
export class StationsFormComponent {
  newStationForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newStationForm = this.fb.group({
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      latitude: [
        0,
        [
          Validators.required,
          Validators.pattern('^-?([0-8]?[0-9]|90)(.[0-9]{1,10})$'),
        ],
      ],
      longitude: [
        0,
        [
          Validators.required,
          Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,10})$'),
        ],
      ],
    });
  }

  onSubmit() {
    console.log(this.newStationForm);
  }
}

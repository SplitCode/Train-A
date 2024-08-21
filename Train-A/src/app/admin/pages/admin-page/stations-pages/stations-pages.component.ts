import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-stations-pages',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CustomButtonComponent],
  templateUrl: './stations-pages.component.html',
})
export class StationsPagesComponent {
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
    console.log('Form Clicked');
  }
}

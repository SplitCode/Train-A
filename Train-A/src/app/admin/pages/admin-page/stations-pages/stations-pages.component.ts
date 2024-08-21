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
      latitude: [0, [Validators.required]],
      longitude: [0, [Validators.required]],
    });
  }

  onSubmit() {
    console.log('Form Clicked');
  }
}

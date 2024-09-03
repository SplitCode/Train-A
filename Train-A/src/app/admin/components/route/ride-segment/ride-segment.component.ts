import { Component, Input, OnInit } from '@angular/core';
import { Price } from '../../../../redux/states/search.state';
import { CommonModule } from '@angular/common';
import { EditCarriageComponent } from '../edit-carriage/edit-carriage.component';
import { EditTimeComponent } from '../edit-time/edit-time.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-ride-segment',
  standalone: true,
  imports: [
    CommonModule,
    EditCarriageComponent,
    EditTimeComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './ride-segment.component.html',
  styleUrl: './ride-segment.component.scss',
})
export class RideSegmentComponent implements OnInit {
  @Input() segment!: {
    city: string;
    time: { departure: string; arrival: string };
    price: Price;
  };

  time: FormGroup;

  priceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.priceForm = this.fb.group({});
    this.time = this.fb.group([]);
  }

  ngOnInit(): void {
    if (this.segment) {
      this.setPriceControls(this.segment.price);
      this.time = this.fb.group({
        departure: this.segment.time.departure,
        arrival: this.segment.time.arrival,
      });
    }
  }

  setPriceControls(price: Price): void {
    Object.keys(price).forEach((key) => {
      this.priceForm.addControl(
        key,
        this.fb.control(price[key], Validators.required),
      );
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Price,
  ScheduleTimeRide,
  SegmentsStation,
} from '../../../../redux/states/search.state';
import { RideSegmentComponent } from '../ride-segment/ride-segment.component';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ride-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RideSegmentComponent,
    CommonModule,
    PRIME_NG_MODULES.FieldsetModule,
    PRIME_NG_MODULES.DialogModule,
  ],
  templateUrl: './ride-item.component.html',
  styleUrl: './ride-item.component.scss',
})
export class RideItemComponent implements OnInit {
  @Input() data!: ScheduleTimeRide;

  UpdateRideForm!: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.UpdateRideForm = this.fb.group({
      segments: this.fb.array([]),
    });
  }

  public onSubmit() {
    this.submitted = true;
    // if (this.UpdateRideForm.valid) {
    //   this.isSubmitting = true;
    //   this.profileService
    //     .updateProfileData(this.UpdateRideForm.value)
    //     .subscribe({
    //       next: (response) => {
    //         this.messageService.add({
    //           severity: 'success',
    //           summary: 'Success',
    //           detail: 'User data updated!',
    //         });
    //         this.store.dispatch(
    //           setUserData({
    //             name: response.name,
    //             email: response.email,
    //           }),
    //         );
    //       },
    //       error: (err: ServerError) => {
    //         this.isSubmitting = false;
    //         Object.keys(err).forEach((key) => {
    //           if (key === 'general') {
    //             this.messageService.add({
    //               severity: 'error',
    //               summary: 'Error',
    //               detail: err[key],
    //             });
    //           } else {
    //             this.UpdateRideForm.get(key)?.setErrors({
    //               serverError: err[key as keyof ServerError],
    //             });
    //           }
    //         });
    //       },
    //       complete: () => {
    //         this.isSubmitting = false;
    //       },
    //     });
    // }
  }

  ngOnInit(): void {
    if (this.data) {
      this.setSegments(this.data.segments);

      this.setPriceControls(this.data.segments);
    }
  }

  setSegments(segments: SegmentsStation[]): void {
    const segmentsFormArray = this.UpdateRideForm.get('segments') as FormArray;
    segments.forEach((segment) => {
      segmentsFormArray.push(
        this.fb.group({
          city: [segment.city, Validators.required],
          time: this.fb.group({
            departure: [segment.departure, Validators.required],
            arrival: [segment.arrival, Validators.required],
          }),
          price: this.fb.group({}),
        }),
      );
    });
  }

  setPriceControls(segments: SegmentsStation[]): void {
    const segmentsFormArray = this.UpdateRideForm.get('segments') as FormArray;
    segments.forEach((segment, index) => {
      const priceGroup = segmentsFormArray.controls[index].get(
        'price',
      ) as FormGroup;
      if (segment.price) {
        this.addPriceControls(priceGroup, segment.price);
      }
    });
  }

  addPriceControls(priceGroup: FormGroup, data: Price[]): void {
    for (const key in data) {
      const value = data[key];
      priceGroup.addControl(key, this.fb.control(value, Validators.required));
    }
  }

  get segmentsControls() {
    return (this.UpdateRideForm.get('segments') as FormArray)?.controls;
  }
}

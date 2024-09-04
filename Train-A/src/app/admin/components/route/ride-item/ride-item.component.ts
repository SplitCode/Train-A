import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Price,
  ScheduleTimeRide,
  // Segments,
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
import {
  CustomButtonComponent,
  InputComponent,
} from '../../../../shared/components';
import {
  deleteRideById,
  // updateRideById,
} from '../../../../redux/actions/routes.actions';
import { Store } from '@ngrx/store';
// import { Route } from '@angular/router';
import { RoutesService } from '../../../services/routes.service';
import { EditCarriageComponent } from '../edit-carriage/edit-carriage.component';
import { EditTimeComponent } from '../edit-time/edit-time.component';

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
    CustomButtonComponent,
    EditCarriageComponent,
    EditTimeComponent,
    InputComponent,
  ],
  templateUrl: './ride-item.component.html',
  styleUrl: './ride-item.component.scss',
})
export class RideItemComponent implements OnInit {
  @Input() data!: ScheduleTimeRide;

  @Input() routeId!: number;

  UpdateRideForm!: FormGroup;

  public submitted = false;

  public isSubmitting = false;

  public editMode: boolean = false;

  public inValidate: boolean = false;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private store: Store,
    private routesService: RoutesService,
  ) {
    this.UpdateRideForm = this.fb.group({
      segments: this.fb.array([]),
    });
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
      const value: Price = data[key];
      priceGroup.addControl(key, this.fb.control(value, Validators.required));
    }
  }

  get segmentsControls() {
    return (this.UpdateRideForm.get('segments') as FormArray)?.controls;
  }

  getPriceControls(segmentIndex: number) {
    return (
      (this.UpdateRideForm.get('segments') as FormArray)?.controls[
        segmentIndex
      ].get('price') as FormGroup
    )?.controls;
  }

  deleteRide(rideId: number): void {
    this.store.dispatch(
      deleteRideById({ routeId: this.routeId, rideId: rideId }),
    );
  }

  updateRide(rideId: number): void {
    const segmentsStations = this.UpdateRideForm.value.segments;
    console.log(
      'segmentsStations',
      rideId,
      segmentsStations,
      this.routesService.convertSegmentsToBase(segmentsStations),
    );

    // this.store.dispatch(
    //   updateRideById({
    //     routeId: this.routeId,
    //     rideId: rideId,
    //     segmentsByPath: segmentsStations,
    //   }),
    // );
  }

  toggleEditMode() {
    if (this.inValidate !== true) {
      this.editMode = !this.editMode;
    }
  }
}

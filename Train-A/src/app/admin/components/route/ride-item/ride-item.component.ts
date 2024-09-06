import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ScheduleTimeRide,
  // Segments,
  // SegmentsStation,
} from '../../../../redux/states/search.state';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomButtonComponent } from '../../../../shared/components';
import {
  deleteRideById,
  updateRideById,
  // updateRideById,
} from '../../../../redux/actions/routes.actions';
import { Store } from '@ngrx/store';
// import { Route } from '@angular/router';
import { RoutesService } from '../../../services/routes.service';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-ride-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PRIME_NG_MODULES.FieldsetModule,
    PRIME_NG_MODULES.DialogModule,
    CustomButtonComponent,

    InputTextModule,
    CalendarModule,
    InputNumberModule,
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

  public editModeList: number[] = [];

  public isError: boolean = false;

  public editModeTimeList: number[] = [];

  public isErrorTime: boolean = false;

  public inValidate: boolean = false;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private store: Store,
    private routesService: RoutesService,
  ) {}

  ngOnInit(): void {
    this.UpdateRideForm = this.fb.group({
      segments: new FormArray(
        this.data.segments.map((segment) =>
          this.fb.group({
            city: [segment.city, Validators.required],
            arrival:
              segment.arrival !== null
                ? [
                    segment.arrival
                      ? new Date(segment.arrival)
                      : segment.arrival,
                    Validators.required,
                  ]
                : null,
            departure: segment.departure
              ? [
                  segment.departure
                    ? new Date(segment.departure)
                    : segment.departure,
                  Validators.required,
                ]
              : null,
            price: segment.price
              ? this.fb.group({
                  ...Object.keys(segment.price || {}).reduce(
                    (
                      acc: { [key: string]: FormControl },
                      key: string,
                      index,
                    ) => {
                      const priceArray = segment.price
                        ? Object.values(segment.price)
                        : [];
                      const carriage = segment.price ? priceArray[index] : 0;
                      acc[key] = this.fb.control(+carriage, [
                        Validators.required,
                        Validators.min(1),
                      ]);
                      return acc;
                    },
                    {},
                  ),
                })
              : undefined,
          }),
        ),
      ),
    });

    this.isError = this.UpdateRideForm.invalid;

    this.isErrorTime = this.UpdateRideForm.invalid;
  }

  get segments() {
    return this.UpdateRideForm.get('segments') as FormArray;
  }

  getPriceControls(index: number): FormGroup {
    return (
      (this.segments.at(index).get('price') as FormGroup) || this.fb.group({})
    );
  }

  getDataPrice(index: number, in2: string): string {
    return Object.keys(this.data.segments[index].price ?? {}).filter((key) => {
      return key === in2;
    })[0] as string;
  }

  checkPriceControls(index: number): boolean {
    return (this.segments.at(index).get('price') as FormGroup).invalid;
  }

  checkTimeControls(index: number): boolean {
    return (
      ((this.segments.at(index).get('arrival') as FormControl).invalid &&
        !!this.data.segments[index].arrival) ||
      ((this.segments.at(index).get('departure') as FormControl).invalid &&
        !!this.data.segments[index].departure)
    );
  }

  getSegment(index: number): FormGroup {
    return this.segments.at(index) as FormGroup;
  }

  getTimeControls(index: number): FormGroup {
    return this.segments.at(index).get('time') as FormGroup;
  }

  deleteRide(rideId: number): void {
    this.store.dispatch(
      deleteRideById({ routeId: this.routeId, rideId: rideId }),
    );
  }

  updateRide(rideId: number): void {
    this.store.dispatch(
      updateRideById({
        routeId: this.routeId,
        rideId: rideId,
        segmentsByPath: this.UpdateRideForm.value.segments,
      }),
    );
  }

  checkIfEditMode(index: number): boolean {
    return this.editModeList.includes(index);
  }

  toggleEditMode(index: number) {
    this.inValidate = !this.inValidate;
    // if (!this.isError)
    if (this.editModeList.includes(index)) {
      this.editModeList = this.editModeList.filter((item) => item !== index);
    } else {
      this.editModeList.push(index);
    }
  }

  checkIfEditTimeMode(index: number): boolean {
    return this.editModeTimeList.includes(index);
  }

  toggleEditTimeMode(index: number) {
    // if (!this.isErrorTime)
    if (this.editModeTimeList.includes(index)) {
      this.editModeTimeList = this.editModeTimeList.filter(
        (item) => item !== index,
      );
    } else {
      this.editModeTimeList.push(index);
    }
  }
}

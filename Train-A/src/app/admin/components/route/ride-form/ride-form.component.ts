import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { RoutesService } from '../../../services/routes.service';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CustomButtonComponent } from '../../../../shared/components';
import {
  createRide,
  showRideForm,
} from '../../../../redux/actions/routes.actions';
import { Observable, tap } from 'rxjs';
import { selectRideFormVisibility } from '../../../../redux/selectors/routes.selectors';
import { RoutesItemByPath } from '../../../models/routes-item.interface';

@Component({
  selector: 'app-ride-form',
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
  templateUrl: './ride-form.component.html',
  styleUrl: './ride-form.component.scss',
})
export class RideFormComponent implements OnInit {
  @Input() data!: RoutesItemByPath;

  @Input() route!: number;

  @Input() showForm: boolean = false;

  public formVisible$: Observable<boolean>;
  // @Input() showForm: boolean = true;

  CreateRideForm!: FormGroup;

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
  ) {
    this.formVisible$ = this.store.select(selectRideFormVisibility);
  }

  ngOnInit(): void {
    this.formVisible$
      .pipe(
        tap((visible) => {
          if (visible) {
            this.CreateRideForm = this.fb.group({
              segments: new FormArray(
                this.data.path.map((city, index) =>
                  this.fb.group({
                    city: [city, Validators.required],
                    arrival:
                      index !== this.data.path.length - 1
                        ? ['', Validators.required]
                        : null,
                    departure: index !== 0 ? ['', Validators.required] : null,
                    price:
                      index !== this.data.path.length - 1
                        ? this.fb.group({
                            ...this.data.carriages.reduce(
                              (
                                acc: { [key: string]: FormControl },
                                key: string,
                              ) => {
                                acc[key] = this.fb.control(
                                  '1',
                                  Validators.required,
                                );
                                return acc;
                              },
                              {},
                            ),
                          })
                        : null,
                  }),
                ),
              ),
            });
          }
        }),
      )
      .subscribe();

    // this.CreateRideForm = this.fb.group({
    //   segments: new FormArray(
    //     this.data.segments.map((segment) =>
    //       this.fb.group({
    //         city: [segment.city, Validators.required],
    //         arrival:
    //           segment.arrival !== null
    //             ? [
    //                 segment.arrival
    //                   ? new Date(segment.arrival)
    //                   : segment.arrival,
    //                 Validators.required,
    //               ]
    //             : null,
    //         departure: segment.departure
    //           ? [
    //               segment.departure
    //                 ? new Date(segment.departure)
    //                 : segment.departure,
    //               Validators.required,
    //             ]
    //           : null,
    //         price: segment.price
    //           ? this.fb.group({
    //               ...Object.keys(segment.price || {}).reduce(
    //                 (
    //                   acc: { [key: string]: FormControl },
    //                   key: string,
    //                   index,
    //                 ) => {
    //                   const priceArray = segment.price
    //                     ? Object.values(segment.price)
    //                     : [];
    //                   const carriage = segment.price ? priceArray[index] : 0;
    //                   acc[key] = this.fb.control(
    //                     +carriage,
    //                     Validators.required,
    //                   );
    //                   return acc;
    //                 },
    //                 {},
    //               ),
    //             })
    //           : null,
    //       }),
    //     ),
    //   ),
    // });
  }

  get segments() {
    return this.CreateRideForm.get('segments') as FormArray;
  }

  getPriceControls(index: number): FormGroup {
    return (
      (this.segments.at(index).get('price') as FormGroup) || this.fb.group({})
    );
  }

  checkPriceControls(index: number): boolean {
    return (this.segments.at(index).get('price') as FormGroup).invalid;
  }

  checkTimeControls(index: number): boolean {
    return (
      ((this.segments.at(index).get('arrival') as FormControl).invalid &&
        index !== this.data.path.length - 1) ||
      ((this.segments.at(index).get('departure') as FormControl).invalid &&
        index !== 0)
    );
  }

  getSegment(index: number): FormGroup {
    return this.segments.at(index) as FormGroup;
  }

  getTimeControls(index: number): FormGroup {
    return this.segments.at(index).get('time') as FormGroup;
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
    if (!this.editModeTimeList.includes(index)) {
      this.editModeTimeList = this.editModeTimeList.filter(
        (item) => item !== index,
      );
    } else {
      this.editModeTimeList.push(index);
    }
  }

  createRide(): void {
    console.log(this.CreateRideForm.value.segments);

    this.store.dispatch(
      createRide({
        routeId: this.route,
        segmentsByPath: this.CreateRideForm.value.segments,
      }),
    );
  }

  setShowForm(): void {
    // this.showForm = true;
    this.store.dispatch(showRideForm());
  }
}

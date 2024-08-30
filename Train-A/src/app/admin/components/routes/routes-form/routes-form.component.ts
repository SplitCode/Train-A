import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import {
  createRoute,
  hideRouteForm,
  updateRoute,
} from '../../../../redux/actions/routes.actions';
import { Observable, Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import {
  selectRouteFormMode,
  selectRouteFormVisibility,
} from '../../../../redux/selectors/routes.selectors';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';
import {
  ConnectedStations,
  StationsItem,
} from '../../../../redux/states/stations.state';
import { CarriageItem } from '../../../models/carriage-item.interface';
import { selectAllCarriages } from '../../../../redux/selectors/carriage.selectors';

@Component({
  selector: 'app-routes-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomButtonComponent,
    PRIME_NG_MODULES.DialogModule,
    PRIME_NG_MODULES.DropdownModule,
  ],
  templateUrl: './routes-form.component.html',
})
export class RoutesFormComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();

  public isVisible: boolean = false;

  public currentMode: 'create' | 'update' = 'create';

  public routeForm: FormGroup;

  public isVisible$: Observable<boolean>;

  public currentMode$: Observable<'create' | 'update'>;

  public allCarriages$: Observable<CarriageItem[]>;

  public allStations$: Observable<StationsItem[]>;

  public connectedStations!: ConnectedStations[];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.allStations$ = this.store.select(selectAllStations);
    this.allCarriages$ = this.store.select(selectAllCarriages);
    this.isVisible$ = this.store.select(selectRouteFormVisibility);
    this.currentMode$ = this.store.select(selectRouteFormMode);
    this.routeForm = this.createForm();
  }

  ngOnInit() {
    this.subscriptions.add(
      this.isVisible$.subscribe((visible) => {
        this.isVisible = visible;
      }),
    );
    this.subscriptions.add(
      this.currentMode$.subscribe((mode) => {
        this.currentMode = mode;
      }),
    );

    this.subscriptions.add(
      this.carriages.valueChanges.subscribe(() => {
        this.checkAndAddCarriageField();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get stations() {
    return this.routeForm.get('stations') as FormArray;
  }

  get carriages() {
    return this.routeForm.get('carriages') as FormArray;
  }

  createForm(): FormGroup {
    return this.fb.group({
      stations: this.fb.array([this.fb.control('', Validators.required)]),
      carriages: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  checkAndAddCarriageField() {
    const carriagesArray = this.carriages;
    const lastControl = carriagesArray.at(carriagesArray.length - 1);

    if (lastControl && lastControl.value) {
      this.addCarriageField();
    }
  }

  addStationField() {
    this.stations.push(this.fb.control('', Validators.required));
  }

  addCarriageField() {
    this.carriages.push(this.fb.control('', Validators.required));
  }

  removeCarriageField(index: number) {
    this.carriages.removeAt(index);
  }

  removeStationField(index: number) {
    this.stations.removeAt(index);
  }

  // public onHide() {
  //   this.connectedStations = this.routeForm.value.stations.connectedTo;

  //   this.routeForm.patchValue({
  //     city2: '',
  //   });
  // }

  closeDialog() {
    this.routeForm.reset();
    this.clearFormArrays();
    this.store.dispatch(hideRouteForm());
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.routeForm.valid) {
      console.log('Form is valid');
      this.subscriptions.add(
        this.currentMode$.subscribe((mode) => {
          console.log('Current mode:', mode);
          if (mode === 'create') {
            this.store.dispatch(createRoute({ route: this.routeForm.value }));
          } else {
            this.store.dispatch(updateRoute({ route: this.routeForm.value }));
          }
          this.closeDialog();
        }),
      );
    }
  }

  private clearFormArrays() {
    while (this.stations.length !== 1) {
      this.stations.removeAt(1);
    }
    while (this.carriages.length !== 1) {
      this.carriages.removeAt(1);
    }
    this.stations.at(0).reset();
    this.carriages.at(0).reset();
  }
}

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

@Component({
  selector: 'app-routes-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomButtonComponent,
    PRIME_NG_MODULES.DialogModule,
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

  public availableStations: { id: string; city: string }[] = [];

  public availableCarriages: { code: string; name: string }[] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.routeForm = this.createForm();
    this.isVisible$ = this.store.select(selectRouteFormVisibility);
    this.currentMode$ = this.store.select(selectRouteFormMode);
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
    this.availableStations = [
      { id: '1', city: 'New York' },
      { id: '2', city: 'Los Angeles' },
      { id: '3', city: 'Chicago' },
    ];

    this.availableCarriages = [
      { code: 'A', name: 'First Class' },
      { code: 'B', name: 'Second Class' },
      { code: 'C', name: 'Sleeper' },
    ];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get pathControls() {
    return (this.routeForm.get('path') as FormArray)?.controls;
  }

  get carriagesControls() {
    return (this.routeForm.get('carriages') as FormArray)?.controls;
  }

  createForm(): FormGroup {
    return this.fb.group({
      path: this.fb.array([this.createStationField()]),
      carriages: this.fb.array([this.createCarriageField()]),
    });
  }

  createStationField(): FormGroup {
    return this.fb.group({
      stationId: ['', Validators.required],
    });
  }

  createCarriageField(): FormGroup {
    return this.fb.group({
      carriageType: ['', Validators.required],
    });
  }

  addStationField() {
    const pathArray = this.routeForm.get('path') as FormArray;
    pathArray.push(this.createStationField());
  }

  addCarriageField() {
    const carriagesArray = this.routeForm.get('carriages') as FormArray;
    carriagesArray.push(this.createCarriageField());
  }

  closeDialog() {
    this.routeForm.reset();
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
}

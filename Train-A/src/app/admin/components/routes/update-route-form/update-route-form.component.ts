import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import {
  hideRouteForm,
  updateRoute,
} from '../../../../redux/actions/routes.actions';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';
import {
  // ConnectedStations,
  StationsItem,
} from '../../../../redux/states/stations.state';
import { CarriageItem } from '../../../models/carriage-item.interface';
import { selectAllCarriages } from '../../../../redux/selectors/carriage.selectors';
import { validateRouteForm } from '../create-route-form/routes-validation.directive';
import {
  selectRouteById,
  selectRouteId,
} from '../../../../redux/selectors/routes.selectors';
import { RoutesItem } from '../../../models/routes-item.interface';

@Component({
  selector: 'app-update-route-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomButtonComponent,
    PRIME_NG_MODULES.DialogModule,
    PRIME_NG_MODULES.DropdownModule,
    PRIME_NG_MODULES.CardModule,
  ],
  templateUrl: './update-route-form.component.html',
  styleUrl: './update-route-form.component.scss',
})
export class UpdateRouteFormComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();

  public routeForm: FormGroup;

  public allCarriages$: Observable<CarriageItem[]>;

  public allStations$: Observable<StationsItem[]>;

  public routeId$: Observable<number | null>;

  public currentRoute$: Observable<RoutesItem | undefined>;

  // public connectedStations!: ConnectedStations[];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.allStations$ = this.store.select(selectAllStations);
    this.allCarriages$ = this.store.select(selectAllCarriages);
    this.routeId$ = this.store.select(selectRouteId);
    this.currentRoute$ = this.routeId$.pipe(
      filter((routeId): routeId is number => routeId !== null),
      switchMap((routeId) => this.store.select(selectRouteById(routeId))),
    );
    this.routeForm = this.createForm();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.currentRoute$.subscribe((route) => {
        console.log('This route:', route);
        if (route) {
          this.populateStationsAndCarriages(route);
        }
      }),
    );

    this.subscriptions.add(
      this.carriages.valueChanges.subscribe(() => {
        this.checkAndAddCarriageField();
      }),
    );

    this.subscriptions.add(
      this.stations.valueChanges.subscribe(() => {
        this.checkAndAddStationField();
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

  private createForm(): FormGroup {
    return this.fb.group(
      {
        stations: this.fb.array([]),
        carriages: this.fb.array([]),
      },
      { validators: validateRouteForm },
    );
  }

  private populateStationsAndCarriages(route: RoutesItem) {
    this.clearFormArrays();

    route.path.forEach((stationID: number) => {
      this.stations.push(this.fb.control(stationID));
    });

    route.carriages.forEach((carriageCode: string) => {
      this.carriages.push(this.fb.control(carriageCode));
    });

    this.checkAndAddStationField();
    this.checkAndAddCarriageField();
  }

  private checkAndAddCarriageField() {
    const carriagesArray = this.carriages;
    const lastControl = carriagesArray.at(carriagesArray.length - 1);

    if (lastControl && lastControl.value) {
      this.addCarriageField();
    }
  }

  private checkAndAddStationField() {
    const stationsArray = this.stations;
    const lastControl = stationsArray.at(stationsArray.length - 1);

    if (lastControl && lastControl.value) {
      this.addStationField();
    }
  }

  addStationField() {
    this.stations.push(this.fb.control(''));
  }

  addCarriageField() {
    this.carriages.push(this.fb.control(''));
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

  // private clearFormArrays() {
  //   while (this.stations.length !== 1) {
  //     this.stations.removeAt(1);
  //   }
  //   while (this.carriages.length !== 1) {
  //     this.carriages.removeAt(1);
  //   }
  //   this.stations.at(0).reset();
  //   this.carriages.at(0).reset();
  // }

  private clearFormArrays() {
    while (this.stations.length !== 0) {
      this.stations.removeAt(0);
    }
    while (this.carriages.length !== 0) {
      this.carriages.removeAt(0);
    }
  }

  public closeForm() {
    this.routeForm.reset();
    this.clearFormArrays();
    this.store.dispatch(hideRouteForm());
  }

  public onSubmit() {
    if (this.routeForm.valid) {
      const sanitizedStations = this.stations.value.slice(0, -1);
      const sanitizedCarriages = this.carriages.value.slice(0, -1);

      const routeData = {
        path: sanitizedStations,
        carriages: sanitizedCarriages,
      };

      this.routeId$.subscribe((routeId) => {
        if (routeId !== null) {
          this.store.dispatch(updateRoute({ id: routeId, route: routeData }));
        }
      });

      console.log(routeData);
      this.closeForm();
    }
  }
}

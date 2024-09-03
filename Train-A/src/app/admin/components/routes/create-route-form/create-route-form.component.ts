import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PRIME_NG_MODULES } from '../../../../shared/modules/prime-ng-modules';
import {
  createRoute,
  hideRouteForm,
} from '../../../../redux/actions/routes.actions';
import { Observable, Subscription, take } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';
import { StationsItem } from '../../../../redux/states/stations.state';
import { CarriageItem } from '../../../models/carriage-item.interface';
import { selectAllCarriages } from '../../../../redux/selectors/carriage.selectors';
import { validateRouteForm } from '../../../utilits/routes-validation.directive';

@Component({
  selector: 'app-create-route-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomButtonComponent,
    PRIME_NG_MODULES.DialogModule,
    PRIME_NG_MODULES.DropdownModule,
    PRIME_NG_MODULES.CardModule,
  ],
  templateUrl: './create-route-form.component.html',
  styleUrl: './create-route-form.component.scss',
})
export class CreateRouteFormComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();

  public routeForm: FormGroup;

  public allCarriages$: Observable<CarriageItem[]>;

  public allStations$: Observable<StationsItem[]>;

  public availableStationsList: StationsItem[][] = [];

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.allStations$ = this.store.select(selectAllStations);
    this.allCarriages$ = this.store.select(selectAllCarriages);
    this.routeForm = this.createForm();
  }

  public ngOnInit() {
    this.subscriptions.add(
      this.stations.valueChanges.subscribe(() => {
        this.checkAndAddStationField();
      }),
    );

    this.subscriptions.add(
      this.carriages.valueChanges.subscribe(() => {
        this.checkAndAddCarriageField();
      }),
    );

    this.allStations$.pipe(take(1)).subscribe((stations) => {
      this.availableStationsList = [stations];
    });
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public get stations() {
    return this.routeForm.get('stations') as FormArray;
  }

  public get carriages() {
    return this.routeForm.get('carriages') as FormArray;
  }

  private createForm(): FormGroup {
    return this.fb.group(
      {
        stations: this.fb.array([this.createStationControl(true)]),
        carriages: this.fb.array([this.fb.control(null)]),
      },
      { validators: validateRouteForm },
    );
  }

  private createStationControl(isLast: boolean): FormControl {
    return this.fb.control({ value: null, disabled: !isLast });
  }

  private checkAndAddStationField() {
    const stationsArray = this.stations;
    const lastControlIndex = stationsArray.length - 1;
    const lastControl = stationsArray.at(lastControlIndex);

    if (lastControl && lastControl.value !== null) {
      const selectedStationId: number = lastControl.value;
      this.updateConnectedStations(selectedStationId, lastControlIndex + 1);
      this.addStationField();
    }
  }

  private checkAndAddCarriageField() {
    const carriagesArray = this.carriages;
    const lastControl = carriagesArray.at(carriagesArray.length - 1);

    if (lastControl && lastControl.value) {
      this.addCarriageField();
    }
  }

  private updateConnectedStations(stationId: number, nextIndex: number) {
    this.allStations$.pipe(take(1)).subscribe((stations) => {
      const selectedStation = stations.find(
        (station) => station.id === stationId,
      );

      if (selectedStation?.connectedTo) {
        const connectedStationIds = selectedStation.connectedTo.map(
          (connection) => connection.id,
        );

        const connectedStations = stations.filter((station) =>
          connectedStationIds.includes(station.id),
        );

        this.availableStationsList[nextIndex] = connectedStations;
      } else {
        this.availableStationsList[nextIndex] = [];
      }
    });
  }

  private addStationField() {
    this.stations.push(this.createStationControl(true));
    this.availableStationsList.push([]);
    this.updateStationControls();
  }

  private addCarriageField() {
    this.carriages.push(this.fb.control(null));
  }

  public removeCarriageField(index: number) {
    this.carriages.removeAt(index);
  }

  public removeStationField(index: number) {
    this.stations.removeAt(index);
    this.availableStationsList.splice(index, 1);

    const newLastControlIndex = this.stations.length - 1;
    if (newLastControlIndex >= 0) {
      if (this.stations.length === 1) {
        this.allStations$.pipe(take(1)).subscribe((stations) => {
          this.availableStationsList[0] = stations;
        });
      } else {
        const previousStationId = this.stations.at(
          newLastControlIndex - 1,
        ).value;
        this.updateConnectedStations(previousStationId, newLastControlIndex);
      }
    }
  }

  private updateStationControls() {
    this.stations.controls.forEach((control, index) => {
      if (index < this.stations.length - 1) {
        control.disable();
      } else {
        control.enable();
      }
    });
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

  public closeForm() {
    this.routeForm.reset();
    this.clearFormArrays();
    this.store.dispatch(hideRouteForm());
  }

  public onSubmit() {
    if (this.routeForm.valid) {
      const sanitizedStations = this.stations.controls
        .filter((control) => control.value !== null)
        .map((control) => control.value);

      const sanitizedCarriages = this.carriages.controls
        .filter((control) => control.value !== null)
        .map((control) => control.value);

      const routeData = {
        path: sanitizedStations,
        carriages: sanitizedCarriages,
      };

      console.log(routeData);
      this.store.dispatch(createRoute({ route: routeData }));
      this.closeForm();
    }
  }
}

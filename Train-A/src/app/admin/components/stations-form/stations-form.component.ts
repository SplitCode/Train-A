import { Component, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createStation } from '../../../redux/actions/stations.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StationsItem } from '../../../redux/states/stations.state';
import {
  selectAllStations,
  selectSelectedStation,
} from '../../../redux/selectors/stations.selectors';

@Component({
  selector: 'app-stations-form',
  standalone: true,
  imports: [CustomButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './stations-form.component.html',
  styleUrl: './stations-form.component.scss',
})
export class StationsFormComponent implements OnInit {
  stations$: Observable<StationsItem[]>;

  selectedStation$: Observable<StationsItem | null>;

  newStationForm!: FormGroup;

  selectedStation!: StationsItem | null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.stations$ = this.store.select(selectAllStations);
    this.selectedStation$ = this.store.select(selectSelectedStation);

    this.newStationForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(3)]],
      latitude: [
        0,
        [
          Validators.required,
          Validators.pattern('^-?([0-8]?[0-9]|90)(.[0-9]{1,30})$'),
        ],
      ],
      longitude: [
        0,
        [
          Validators.required,
          Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,30})$'),
        ],
      ],
      relations: [[]],
    });
  }

  ngOnInit(): void {
    this.selectedStation$.subscribe((station) => {
      if (station) {
        this.newStationForm.patchValue({
          city: station.city,
          latitude: station.latitude,
          longitude: station.longitude,
          relations: station.connectedTo || [],
        });
      } else {
        this.resetForm();
      }
    });
  }

  private resetForm(): void {
    this.newStationForm.reset({
      city: '',
      latitude: 0,
      longitude: 0,
      relations: [],
    });
  }

  onSubmit() {
    const stationData = this.newStationForm.value;

    this.store.dispatch(createStation({ station: stationData }));
  }
}

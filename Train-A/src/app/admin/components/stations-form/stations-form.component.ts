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
import { map, Observable } from 'rxjs';
import { StationsItem } from '../../../redux/states/stations.state';
import {
  selectAllStations,
  selectSelectedStation,
} from '../../../redux/selectors/stations.selectors';
import { MultiSelectModule } from 'primeng/multiselect';

interface ConnectedStationsProps {
  id: number;
  city: string;
}

@Component({
  selector: 'app-stations-form',
  standalone: true,
  imports: [
    CustomButtonComponent,
    ReactiveFormsModule,
    CommonModule,
    MultiSelectModule,
  ],
  templateUrl: './stations-form.component.html',
  styleUrl: './stations-form.component.scss',
})
export class StationsFormComponent implements OnInit {
  stations$: Observable<StationsItem[]>;

  selectedStation$: Observable<StationsItem | null>;

  connectedStations$!: Observable<ConnectedStationsProps[]>;

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
      relations: [this.connectedStations$, Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectedStation$.subscribe((station) => {
      if (station) {
        const selectedIds = station.connectedTo?.map((item) => item.id) || [];

        this.newStationForm.patchValue({
          city: station.city,
          latitude: station.latitude,
          longitude: station.longitude,
          relations: selectedIds,
        });
        console.log('Selected Pin: ', this.newStationForm.value);
      } else {
        this.resetForm();
      }
    });

    this.connectedStations$ = this.stations$.pipe(
      map((stationsState: StationsItem[]) =>
        this.mapConnectedStations(stationsState),
      ),
    );
  }

  private mapConnectedStations(
    stations: StationsItem[],
  ): ConnectedStationsProps[] {
    return stations.map((station) => {
      return { id: station.id, city: station.city };
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
    console.log(this.newStationForm.value);

    const stationData = {
      ...this.newStationForm.value,
      relations: this.newStationForm.value.relations.map(
        (item: ConnectedStationsProps) => item.id,
      ),
    };
    console.log('Submited Form: ', stationData);

    this.store.dispatch(createStation({ station: stationData }));
  }
}

import { Component } from '@angular/core';
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
import { selectAllStations } from '../../../redux/selectors/stations.selectors';
import { StationsService } from '../../services/stations.service';

@Component({
  selector: 'app-stations-form',
  standalone: true,
  imports: [CustomButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './stations-form.component.html',
  styleUrl: './stations-form.component.scss',
})
export class StationsFormComponent {
  stations$: Observable<StationsItem[]>;

  newStationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private stationsService: StationsService,
  ) {
    this.stations$ = this.store.select(selectAllStations);

    this.newStationForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(3)]],
      latitude: [
        0,
        [
          Validators.required,
          Validators.pattern('^-?([0-8]?[0-9]|90)(.[0-9]{1,10})$'),
        ],
      ],
      longitude: [
        0,
        [
          Validators.required,
          Validators.pattern('^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,10})$'),
        ],
      ],
      connectedTo: [[]],
    });
  }

  onSubmit() {
    const stationData = this.newStationForm.value;
    console.log(this.newStationForm.value);

    this.store.dispatch(createStation({ station: stationData }));

    // this.store.dispatch(
    //   createStation({
    //     station: {
    //       id: stationsLength,
    //       ...this.newStationForm.value,
    //     },
    //   }),
    // );
  }
}

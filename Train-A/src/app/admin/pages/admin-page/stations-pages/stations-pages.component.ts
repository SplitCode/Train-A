import { Component, OnInit } from '@angular/core';
import { StationsMapComponent } from '../../../components/stations-map/stations-map.component';
import { StationsFormComponent } from '../../../components/stations-form/stations-form.component';
import { Store } from '@ngrx/store';
import { loadStations } from '../../../../redux/actions/stations.actions';
import { StationsListComponent } from '../../../components/stations-list/stations-list.component';

@Component({
  selector: 'app-stations-pages',
  standalone: true,
  imports: [StationsFormComponent, StationsMapComponent, StationsListComponent],
  templateUrl: './stations-pages.component.html',
})
export class StationsPagesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }
}

import { Component, OnInit } from '@angular/core';
import { StationsMapComponent } from '../../../components/stations-map/stations-map.component';
import { StationsFormComponent } from '../../../components/stations-form/stations-form.component';
import { Store } from '@ngrx/store';
import { loadStations } from '../../../../redux/actions/stations.actions';
import { Observable } from 'rxjs';
import { StationsItem } from '../../../../redux/states/stations.state';
import { selectAllStations } from '../../../../redux/selectors/stations.selectors';

@Component({
  selector: 'app-stations-pages',
  standalone: true,
  imports: [StationsFormComponent, StationsMapComponent],
  templateUrl: './stations-pages.component.html',
})
export class StationsPagesComponent implements OnInit {
  public stations$: Observable<StationsItem[]>;

  constructor(private store: Store) {
    this.stations$ = this.store.select(selectAllStations);
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }
}

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StationsItem } from '../../redux/states/stations.state';
import { Store } from '@ngrx/store';
import { selectAllStations } from '../../redux/selectors/stations.selectors';

@Injectable({
  providedIn: 'root',
})
export class GetCityByIDService {
  private stations$: Observable<StationsItem[]>;

  constructor(private store: Store) {
    this.stations$ = this.store.select(selectAllStations);
  }

  public getCityByID(cityID: number): Observable<string | undefined> {
    return this.stations$.pipe(
      map(
        (stations) => stations.find((station) => station.id === cityID)?.city,
      ),
    );
  }
}

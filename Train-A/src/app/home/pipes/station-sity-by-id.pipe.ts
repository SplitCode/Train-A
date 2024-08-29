import { inject, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectStationCityByID } from '../../redux/selectors/stations.selectors';

@Pipe({
  name: 'stationCityById',
  pure: false,
  standalone: true,
})
export class StationCityByIdPipe implements PipeTransform {
  private store = inject(Store);

  transform(stationID: number): Observable<string> {
    return this.store.select(selectStationCityByID(stationID));
  }
}

import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { StationsItem } from '../../../redux/states/stations.state';
import { GetCityByIDService } from '../../../shared/services/getCityByID.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { DialogModule } from 'primeng/dialog';
import { stationModal } from '../../../redux/actions/stations.actions';
import { StationCityByIdPipe } from '../../../home/pipes/station-sity-by-id.pipe';

@Component({
  selector: 'app-stations-item',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    CustomButtonComponent,
    DialogModule,
    StationCityByIdPipe,
  ],
  templateUrl: './stations-item.component.html',
  styleUrl: './stations-item.component.scss',
})
export class StationsItemComponent {
  @Input({ required: true }) station!: StationsItem;

  cityNames$: Observable<(string | undefined)[]> | undefined;

  constructor(
    private getCityByIDService: GetCityByIDService,
    private store: Store,
  ) {}

  public getCityName(cityID: number): Observable<string | undefined> {
    return this.getCityByIDService.getCityByID(cityID);
  }

  public setModalInfo(visible: boolean, station: StationsItem) {
    this.store.dispatch(
      stationModal({
        modalInfo: {
          visibleModal: visible,
          stationInfo: {
            id: station.id,
            city: station.city,
          },
        },
      }),
    );
  }
}

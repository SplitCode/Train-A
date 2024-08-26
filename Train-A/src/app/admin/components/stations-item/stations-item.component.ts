import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { StationsItem } from '../../../redux/states/stations.state';
import { GetCityByIDService } from '../../../shared/services/getCityByID.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { DialogModule } from 'primeng/dialog';
import { deletedStation } from '../../../redux/actions/stations.actions';

@Component({
  selector: 'app-stations-item',
  standalone: true,
  imports: [CommonModule, NgIf, CustomButtonComponent, DialogModule],
  templateUrl: './stations-item.component.html',
  styleUrl: './stations-item.component.scss',
})
export class StationsItemComponent {
  @Input({ required: true }) station!: StationsItem;

  cityNames$: Observable<(string | undefined)[]> | undefined;

  visible: boolean = false;

  constructor(
    private getCityByIDService: GetCityByIDService,
    private store: Store,
  ) {}

  public getCityName(cityID: number): Observable<string | undefined> {
    return this.getCityByIDService.getCityByID(cityID);
  }

  public deleteStation(id: number) {
    this.store.dispatch(deletedStation({ id: id }));
  }
}

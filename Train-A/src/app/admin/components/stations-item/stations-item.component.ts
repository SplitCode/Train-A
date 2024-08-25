import { Component, Input } from '@angular/core';
import { StationsItem } from '../../../redux/states/stations.state';
import { GetCityByIDService } from '../../../shared/services/getCityByID.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-stations-item',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './stations-item.component.html',
  styleUrl: './stations-item.component.scss',
})
export class StationsItemComponent {
  @Input({ required: true }) station!: StationsItem;

  cityNames$: Observable<(string | undefined)[]> | undefined;

  constructor(private getCityByIDService: GetCityByIDService) {}

  public getCityName(cityID: number): Observable<string | undefined> {
    return this.getCityByIDService.getCityByID(cityID);
  }
}

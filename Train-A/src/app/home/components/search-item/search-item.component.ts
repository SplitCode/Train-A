import { Component, Input, OnInit } from '@angular/core';
import { Direction, Segments } from '../../../redux/states/search.state';
import { FullTimePipe } from '../../pipes/full-time.pipe';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { StationCityByIdPipe } from '../../pipes/station-sity-by-id.pipe';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadModalInfo } from '../../../redux/actions/search.actions';
import { loadRideInfo } from '../../../redux/actions/ride.actions';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    CommonModule,
    FullTimePipe,
    KeyValuePipe,
    StationCityByIdPipe,
    CustomButtonComponent,
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent implements OnInit {
  @Input() cityFromTo: Direction[] = [];

  @Input() segment!: Segments;

  @Input() path!: number[];

  @Input() routeButtonConfig!: {
    rideId: number;
    fromStationId: number;
    toStationId: number;
  };

  public isVisiblePath: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {}

  public navigate() {
    this.router.navigate([`trip/${this.routeButtonConfig.rideId}`], {
      queryParams: {
        from: this.routeButtonConfig.fromStationId,
        to: this.routeButtonConfig.toStationId,
      },
      relativeTo: this.route,
    });
  }

  public isDialog() {
    this.loadRideInfo();
    this.store.dispatch(
      loadModalInfo({
        modalInfo: {
          isVisiblePath: true,
          fromStationId: this.cityFromTo[0].stationId.toString(),
          toStationId: this.cityFromTo[1].stationId.toString(),
          rideId: this.routeButtonConfig.rideId.toString(),
          showFromToCities: false,
        },
      }),
    );
  }

  private loadRideInfo(): void {
    if (this.routeButtonConfig.rideId) {
      this.store.dispatch(
        loadRideInfo({ rideId: this.routeButtonConfig.rideId.toString() }),
      );
    }
  }
}

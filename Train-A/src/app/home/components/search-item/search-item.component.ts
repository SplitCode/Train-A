import { Component, Input, OnInit } from '@angular/core';
import { Direction, Segments } from '../../../redux/states/search.state';
import { FullTimePipe } from '../../pipes/full-time.pipe';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { StationCityByIdPipe } from '../../pipes/station-sity-by-id.pipe';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteModalComponent } from '../route-modal/route-modal.component';
import { Store } from '@ngrx/store';
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
    RouteModalComponent,
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

  ngOnInit(): void {
    // console.log(this.segment);
    // const rideId = this.routeButtonConfig.rideId.toString();
    // this.store.dispatch(loadRideInfo({ rideId: rideId }));
  }

  public navigate() {
    this.router.navigate([`trip/${this.routeButtonConfig.rideId}`], {
      queryParams: {
        from: this.routeButtonConfig.fromStationId,
        to: this.routeButtonConfig.toStationId,
      },
      relativeTo: this.route,
    });
  }

  public isDialog(isShow: boolean) {
    const rideId = this.routeButtonConfig.rideId.toString();
    this.store.dispatch(loadRideInfo({ rideId: rideId }));
    this.isVisiblePath = isShow;
  }
}

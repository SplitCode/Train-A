import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { loadRideInfo } from '../../../redux/actions/ride.actions';
import { selectRideInfo } from '../../../redux/selectors/ride.selectors';
import { RideResponse } from '../../../order/models/ride-response.interface';

@Component({
  selector: 'app-trip-detali',
  templateUrl: './trip-detali.component.html',
  styleUrls: ['./trip-detali.component.scss'],
  standalone: true,
})
export class TripDetailComponent implements OnInit {
  rideId: string | null = null;

  rideInfo$: Observable<RideResponse | null>;

  fromStationId: string | null = null;

  toStationId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.rideInfo$ = this.store.select(selectRideInfo);
  }

  ngOnInit() {
    this.rideId = this.route.snapshot.paramMap.get('rideId');
    this.route.queryParamMap.subscribe((params) => {
      this.fromStationId = params.get('from');
      this.toStationId = params.get('to');
    });

    if (this.rideId) {
      this.store.dispatch(loadRideInfo({ rideId: this.rideId }));
    }
  }
}

import { OrderService } from './../../../order/services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  selectAllCarriages,
  selectCarriageByCode,
} from '../../../redux/selectors/carriage.selectors';
import { Store } from '@ngrx/store';
import { CarriageItem } from '../../../admin/models/carriage-item.interface';
import { Observable } from 'rxjs';
import { loadCarriages } from '../../../redux/actions/carriage.actions';

@Component({
  selector: 'app-trip-detali',
  templateUrl: './trip-detali.component.html',
  styleUrls: ['./trip-detali.component.scss'],
  standalone: true,
})
export class TripDetaliComponent implements OnInit {
  rideId: string | null = null;

  carriage$?: Observable<CarriageItem | undefined>;

  public carriages$: Observable<CarriageItem[]>;

  fromStationId: string | null = null;

  toStationId: string | null = null;

  // Каретки при инициализации забирапем в стор
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private store: Store,
  ) {
    this.carriages$ = this.store.select(selectAllCarriages);
  }

  ngOnInit() {
    this.store.dispatch(loadCarriages());
    this.rideId = this.route.snapshot.paramMap.get('rideId');

    this.route.queryParamMap.subscribe((params) => {
      this.fromStationId = params.get('from');
      this.toStationId = params.get('to');
    });

    if (this.rideId) {
      this.orderService.getRideInfo(this.rideId).subscribe({
        next: (data) => {
          const carriageSelector = selectCarriageByCode(data.carriages[0]);
          this.carriage$ = this.store.select(carriageSelector);
          this.carriage$.subscribe((carByType) => {
            console.log('data.carriages[0]:', data.carriages[0]);
            console.log('Ride Info:', data);
            console.log('carByType:', carByType);
          });
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Request complete');
        },
      });
    }
  }
}

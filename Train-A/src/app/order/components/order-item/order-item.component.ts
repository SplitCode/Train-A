import { Component, Input } from '@angular/core';
import { OrderItem, TripData } from '../../models/order-item.interface';
import { CommonModule } from '@angular/common';
import { StationCityByIdPipe } from '../../../home/pipes/station-sity-by-id.pipe';
import { CustomButtonComponent } from '../../../shared/components';
import { Store } from '@ngrx/store';
import { orderModal } from '../../../redux/actions/order.actions';
import { Observable } from 'rxjs';
import { GetCityByIDService } from '../../../shared/services/getCityByID.service';
import { FullTimeHourPipe } from '../../../home/pipes/full-time-hour';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    CommonModule,
    StationCityByIdPipe,
    CustomButtonComponent,
    FullTimeHourPipe,
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  @Input() order!: OrderItem;

  stationStartCity$: Observable<string | undefined> | undefined;

  stationEndCity$: Observable<string | undefined> | undefined;

  tripStartTime: string = '';

  tripEndTime: string = '';

  totalPrice: number = 0;

  constructor(
    private store: Store,
    private getCityByIDService: GetCityByIDService,
  ) {}

  ngOnInit(): void {
    if (this.order) {
      this.stationStartCity$ = this.getCityByIDService.getCityByID(
        this.order.stationStart,
      );
      this.stationEndCity$ = this.getCityByIDService.getCityByID(
        this.order.stationEnd,
      );
    }

    this.calculateTripTime({
      path: this.order.path,
      schedule: this.order.schedule,
      stationStart: this.order.stationStart,
      stationEnd: this.order.stationEnd,
    });
  }

  public setModalInfo(visible: boolean, orderId: number): void {
    this.store.dispatch(
      orderModal({
        modalInfo: {
          visibleModal: visible,
          orderInfo: {
            id: orderId,
          },
        },
      }),
    );
  }

  private calculateTripTime(tripData: TripData): void {
    const { path, schedule, stationStart, stationEnd } = tripData;

    const startIndex = path.indexOf(stationStart);
    const endIndex = path.indexOf(stationEnd);

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      console.error('Uncorrect data');
      return;
    }

    const segments = schedule.segments;

    let startSegmentIndex = 0;
    let endSegmentIndex = 0;

    let accumulatedLength = 0;
    for (let i = 0; i < segments.length; i += 1) {
      accumulatedLength += Math.ceil(path.length / segments.length);
      if (startIndex < accumulatedLength && startSegmentIndex === 0) {
        startSegmentIndex = i;
      }
      if (endIndex < accumulatedLength) {
        endSegmentIndex = i;
        break;
      }
    }

    this.tripStartTime = segments[startSegmentIndex].time[0];
    this.tripEndTime = segments[endSegmentIndex].time[1];
  }
}

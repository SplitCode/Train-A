import { Component, Input } from '@angular/core';
import { OrderItem } from '../../models/order-item.interface';
import { CommonModule } from '@angular/common';
import { StationCityByIdPipe } from '../../../home/pipes/station-sity-by-id.pipe';
import { CustomButtonComponent } from '../../../shared/components';
import { Store } from '@ngrx/store';
import { orderModal } from '../../../redux/actions/order.actions';
import { FullTimePipe } from '../../../home/pipes/full-time.pipe';
import { Observable } from 'rxjs';
import { GetCityByIDService } from '../../../shared/services/getCityByID.service';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    CommonModule,
    StationCityByIdPipe,
    CustomButtonComponent,
    FullTimePipe,
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  @Input() order!: OrderItem;

  stationStartCity$: Observable<string | undefined> | undefined;

  stationEndCity$: Observable<string | undefined> | undefined;

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
}

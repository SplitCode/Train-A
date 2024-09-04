import { Component, Input } from '@angular/core';
import { OrderItem } from '../../models/order-item.interface';
import { CommonModule } from '@angular/common';
import { StationCityByIdPipe } from '../../../home/pipes/station-sity-by-id.pipe';
import { CustomButtonComponent } from '../../../shared/components';
import { Store } from '@ngrx/store';
import { orderModal } from '../../../redux/actions/order.actions';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule, StationCityByIdPipe, CustomButtonComponent],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  @Input() order!: OrderItem;

  constructor(private store: Store) {}

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

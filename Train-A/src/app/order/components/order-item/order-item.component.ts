import { Component, Input } from '@angular/core';
import { OrderItem } from '../../models/order-item.interface';
import { CommonModule } from '@angular/common';
import { StationCityByIdPipe } from '../../../home/pipes/station-sity-by-id.pipe';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [CommonModule, StationCityByIdPipe],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  @Input() order!: OrderItem;
}

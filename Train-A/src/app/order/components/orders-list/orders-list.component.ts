import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../models/order-item.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from '../order-item/order-item.component';
import { PRIME_NG_MODULES } from '../../../shared/modules/prime-ng-modules';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule, OrderItemComponent, PRIME_NG_MODULES.CardModule],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],

  standalone: true,
})
export class OrdersListComponent implements OnInit {
  public orders$!: Observable<OrderItem[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderService.getOrders();
    this.orders$.subscribe((orders) => {
      console.log(orders);
    });
  }
}

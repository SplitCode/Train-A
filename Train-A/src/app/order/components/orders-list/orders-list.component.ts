import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItem } from '../../models/order-item.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-list',
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

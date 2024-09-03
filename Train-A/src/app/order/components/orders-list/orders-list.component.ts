import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItem, Price } from '../../models/order-item.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  imports: [CommonModule],
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

  getKeys(obj: Price): string[] {
    return Object.keys(obj);
  }
}

import { Component, OnInit } from '@angular/core';
import { OrdersListComponent } from '../../components/orders-list/orders-list.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  standalone: true,
  imports: [OrdersListComponent],
})
export class OrderPageComponent implements OnInit {
  ngOnInit() {}
}

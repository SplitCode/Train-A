import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { OrderItem, User } from '../models/order-item.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = API_CONFIG.ordersUrl;

  private userUrl = API_CONFIG.usersUrl;

  constructor(private http: HttpClient) {}

  public getOrders(all: boolean = false): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.orderUrl, {
      params: { all: all.toString() },
    });
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public cancelOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.orderUrl}/${orderId}`);
  }
}

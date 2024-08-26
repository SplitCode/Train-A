import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/order-item.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = API_CONFIG.ordersUrl;

  private userUrl = API_CONFIG.usersUrl;

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.orderUrl);
  }

  public getUsers(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.userUrl);
  }

  public deleteOrder(id: string): Observable<OrderItem[]> {
    return this.http.delete<OrderItem[]>(`${this.orderUrl}/${id}`);
  }
}

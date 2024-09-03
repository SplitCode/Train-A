import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { OrderItem, User } from '../models/order-item.interface';
import { RideResponse } from '../models/ride-response.interface';
// import { MOCK_ORDERS } from '../components/orders-list/mock-orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = API_CONFIG.ordersUrl;

  private userUrl = API_CONFIG.usersUrl;

  private searchUrl = API_CONFIG.searchUrl;

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.orderUrl);
  }

  public getAllOrders(all: boolean = false): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.orderUrl, {
      params: { all: all.toString() },
    });
  }

  // (must be only for manager)
  // public getUsers(): Observable<OrderItem[]> {
  //   return this.http.get<OrderItem[]>(this.usersUrl);
  // }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  // public deleteOrder(orderId: string): Observable<OrderItem[]> {
  //   return this.http.delete<OrderItem[]>(`${this.ordersUrl}/${orderId}`);
  // }

  public cancelOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.orderUrl}/${orderId}`);
  }

  public getRideInfo(rideId: string): Observable<RideResponse> {
    return this.http.get<RideResponse>(`${this.searchUrl}/${rideId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable, of } from 'rxjs';
import { OrderItem } from '../models/order-item.interface';
// import { RideResponse } from '../models/ride-response.interface';
import { MOCK_ORDERS } from '../components/orders-list/mock-orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = API_CONFIG.ordersUrl;

  private userUrl = API_CONFIG.usersUrl;

  private searchUrl = API_CONFIG.searchUrl;

  constructor(private http: HttpClient) {}

  // public getOrders(): Observable<OrderItem[]> {
  //   return this.http.get<OrderItem[]>(this.orderUrl);
  // }

  public getOrders(): Observable<OrderItem[]> {
    return of(MOCK_ORDERS);
  }

  // (must be only for manager)
  public getUsers(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(this.userUrl);
  }

  public deleteOrder(orderId: string): Observable<OrderItem[]> {
    return this.http.delete<OrderItem[]>(`${this.orderUrl}/${orderId}`);
  }

  // public getRideInfo(rideId: string): Observable<RideResponse> {
  //   return this.http.get<RideResponse>(`${this.searchUrl}/${rideId}`);
  // }
}

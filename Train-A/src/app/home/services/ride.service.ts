import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { RideResponse } from '../models/ride-response.interface';
import {
  ErrorOrderResponse,
  OrderRequest,
  OrderResponse,
} from '../models/order-responce.interface';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private orderUrl = API_CONFIG.ordersUrl;

  private searchUrl = API_CONFIG.searchUrl;

  constructor(private http: HttpClient) {}

  public createOrder(orderRequest: OrderRequest): Observable<OrderResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<OrderResponse>(this.orderUrl, orderRequest, {
      headers,
    });
  }

  public cancelOrder(orderId: number): Observable<void | ErrorOrderResponse> {
    const url = `${this.orderUrl}/${orderId}`;
    return this.http.delete<void | ErrorOrderResponse>(url);
  }

  public getRideInfo(rideId: string): Observable<RideResponse> {
    return this.http.get<RideResponse>(`${this.searchUrl}/${rideId}`);
  }
}

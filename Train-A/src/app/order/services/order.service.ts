import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable, of } from 'rxjs';
import { OrderItem } from '../models/order-item.interface';
import { RideResponse } from '../models/ride-response.interface';

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

  public getRideInfo(rideId: string): Observable<RideResponse> {
    const fakeId = rideId;

    const mockRideResponse: RideResponse = {
      rideId: +fakeId,
      path: [10, 27, 126, 155, 169, 51],
      carriages: [
        'carriage3',
        'carriage4',
        'carriage3',
        'carriage5',
        'carriage5',
        'carriage2',
        'carriage3',
        'carriage1',
        'carriage3',
      ],
      schedule: {
        segments: [
          {
            time: ['08:00', '10:00'],
            price: { standard: 100, premium: 150 },
            occupiedSeats: [1, 2, 3],
          },
          {
            time: ['08:00', '10:00'],
            price: { standard: 100, premium: 150 },
            occupiedSeats: [1, 2, 3],
          },
          {
            time: ['08:00', '10:00'],
            price: { standard: 100, premium: 150 },
            occupiedSeats: [1, 2, 3],
          },
          {
            time: ['08:00', '10:00'],
            price: { standard: 100, premium: 150 },
            occupiedSeats: [1, 2, 3],
          },
          {
            time: ['08:00', '10:00'],
            price: { standard: 100, premium: 150 },
            occupiedSeats: [1, 2, 3],
          },
          {
            time: ['12:00', '15:00'],
            price: { standard: 100, premium: 150 },
            occupiedSeats: [1, 2, 3],
          },
        ],
      },
    };
    console.log('getRideInfo', mockRideResponse);
    return of(mockRideResponse);
  }
}

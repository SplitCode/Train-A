import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { CarriageItem } from '../models/carriage-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  private apiUrl = API_CONFIG.carriageUrl;

  constructor(private http: HttpClient) {}

  public getCarriages(): Observable<CarriageItem[]> {
    return this.http.get<CarriageItem[]>(this.apiUrl);
  }

  public createCarriage(carriage: CarriageItem): Observable<CarriageItem> {
    return this.http.post<CarriageItem>(this.apiUrl, carriage);
  }
}

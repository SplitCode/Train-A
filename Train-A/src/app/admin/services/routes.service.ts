import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { RoutesItem } from '../models/routes-item.interface';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private apiUrl = API_CONFIG.routesUrl;

  constructor(private http: HttpClient) {}

  public getRoutes(): Observable<RoutesItem[]> {
    return this.http.get<RoutesItem[]>(this.apiUrl);
  }

  public deleteRoute(routeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${routeId}`);
  }

  createRoute(path: number[], carriages: string[]): Observable<RoutesItem> {
    const body = { path, carriages };
    return this.http.post<RoutesItem>(this.apiUrl, body);
  }

  updateRoute(
    id: number,
    path: number[],
    carriages: string[],
  ): Observable<RoutesItem> {
    const body = { path, carriages };
    return this.http.put<RoutesItem>(`${this.apiUrl}/${id}`, body);
  }

  getRouteById(id: string): Observable<RoutesItem> {
    return this.http.get<RoutesItem>(`${this.apiUrl}/${id}`);
  }
}

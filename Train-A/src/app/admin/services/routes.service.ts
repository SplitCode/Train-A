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

  // public createRoute(route: RoutesItem): Observable<RoutesItem['code']> {
  //   return this.http
  //     .post<{ code: RoutesItem['code'] }>(this.apiUrl, route)
  //     .pipe(map((response) => response.code));
  // }

  // public updateRoute(route: RoutesItem): Observable<RoutesItem['code']> {
  //   return this.http
  //     .put<{ code: RoutesItem['code'] }>(`${this.apiUrl}/${route.id}`, route)
  //     .pipe(map((response) => response.code));
  // }

  // public deleteRoute(routeId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${routeId}`);
  // }
}

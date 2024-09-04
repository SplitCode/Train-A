import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { RoutesItem, RoutesItemByPath } from '../models/routes-item.interface';
import {
  ScheduleTimeRide,
  Segments,
  SegmentsStation,
} from '../../redux/states/search.state';

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

  convertRoutesItemByPath(data: RoutesItem): RoutesItemByPath {
    console.log('data', data.schedule);

    return {
      id: data.id,
      path: data.path,
      carriages: data.carriages,
      schedule: data.schedule.reduce(
        (accSc, item, indexSchedule) => (
          accSc.push({
            rideId: item.rideId,
            segments: this.convertSegments(data, indexSchedule),
          }),
          accSc
        ),
        [] as ScheduleTimeRide[],
      ),
    };
  }

  private convertSegments(
    data: RoutesItem,
    indexSchedule: number,
  ): SegmentsStation[] {
    console.log('data', data);

    return data.path.reduce((acc, pathId, index) => {
      const segment = data.schedule[indexSchedule].segments[index];
      const prevSegment = data.schedule[indexSchedule].segments[index - 1];

      acc.push({
        id: pathId,
        city: pathId,
        departure: prevSegment ? prevSegment.time[1] : undefined,
        arrival: segment ? segment.time[0] : undefined,
        price: segment ? segment.price : undefined,
      });
      return acc;
    }, [] as SegmentsStation[]);
  }

  public deleteRideById(routeId: number, rideId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${routeId}/ride/${rideId}`);
  }

  public updateRideById(
    routeId: number,
    rideId: number,
    segments: Segments[],
  ): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${routeId}/ride/${rideId}`, {
      segments,
    });
  }

  public convertSegmentsToBase(
    segmentsStations: SegmentsStation[],
  ): Segments[] {
    return segmentsStations.reduce((acc, segment, index) => {
      const departure = segment.departure;
      const arrival = segmentsStations[index + 1]
        ? segmentsStations[index + 1].arrival
        : undefined;

      if (segment.price !== undefined) {
        acc.push({
          time: [departure as string, arrival as string],
          price: segment.price,
        });
      }

      return acc;
    }, [] as Segments[]);
  }
}

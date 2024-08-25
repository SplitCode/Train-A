import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { StationsItem } from '../../redux/states/stations.state';
@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private apiUrl = API_CONFIG.stationsUrl;

  constructor(private http: HttpClient) {}

  public getStations(): Observable<StationsItem[]> {
    return this.http.get<StationsItem[]>(this.apiUrl);
  }

  public postStation(form: StationsItem) {
    const headers = { 'Content-Type': 'application/json' };
    const body = { ...form };

    console.log('get it');

    return this.http
      .post<{ id: number }>(`${this.apiUrl}`, body, {
        headers: headers,
      })
      .pipe(map((response) => response.id));
  }
}

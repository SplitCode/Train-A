import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { StationsItem } from '../../redux/states/stations.state';
@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private apiUrl = API_CONFIG.stationsUrl;

  constructor(private http: HttpClient) {}

  getStations(): Observable<StationsItem[]> {
    return this.http.get<StationsItem[]>(this.apiUrl);
  }
}

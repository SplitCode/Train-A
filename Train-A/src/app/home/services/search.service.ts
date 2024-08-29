import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchForm, SearchItem } from '../../redux/states/search.state';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiURL = API_CONFIG.searchUrl;

  constructor(private http: HttpClient) {}

  public getSearch(form: SearchForm) {
    const params = new HttpParams()
      .set('fromLatitude', form.fromLatitude)
      .set('fromLongitude', form.fromLongitude)
      .set('toLatitude', form.toLatitude)
      .set('toLongitude', form.toLongitude)
      .set('time', form.time.toString());

    return this.http
      .get<SearchItem>(this.apiURL, { params })
      .pipe(map((response: SearchItem) => response));
  }
}

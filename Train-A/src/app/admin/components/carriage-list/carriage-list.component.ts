import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from '../../../config/api.config';
import { Observable } from 'rxjs';
import { CarriageItem } from '../../models/carriage-item.interface';

@Component({
  selector: 'app-carriage-list',
  templateUrl: './carriage-list.component.html',
  standalone: true,
})
export class CarriageListComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData().subscribe((data) => {
      console.log(data);
    });
  }

  getData(): Observable<CarriageItem[]> {
    return this.http.get<CarriageItem[]>(API_CONFIG.carriageUrl);
  }
}

import { Component } from '@angular/core';
import { StationsMapComponent } from '../../../components/stations-map/stations-map.component';
import { StationsFormComponent } from '../../../components/stations-form/stations-form.component';

@Component({
  selector: 'app-stations-pages',
  standalone: true,
  imports: [StationsFormComponent, StationsMapComponent],
  templateUrl: './stations-pages.component.html',
})
export class StationsPagesComponent {}

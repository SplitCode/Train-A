import { Component } from '@angular/core';
import { StationsMapComponent } from '../../../components/stations-map/stations-map.component';
import { StationsFormComponent } from '../../../components/stations-form/stations-form.component';

import { StationsListComponent } from '../../../components/stations-list/stations-list.component';

@Component({
  selector: 'app-stations-pages',
  standalone: true,
  imports: [StationsFormComponent, StationsMapComponent, StationsListComponent],
  templateUrl: './stations-pages.component.html',
})
export class StationsPagesComponent {}

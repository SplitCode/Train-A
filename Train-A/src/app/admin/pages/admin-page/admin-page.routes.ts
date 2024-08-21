import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { CarriagesPageComponent } from './carriages-page/carriages-page.component';
import { StationsPagesComponent } from './stations-pages/stations-pages.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
  },
  {
    path: 'stations',
    component: StationsPagesComponent,
  },
  {
    path: 'carriages',
    component: CarriagesPageComponent,
  },
];

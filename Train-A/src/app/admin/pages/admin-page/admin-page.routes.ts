import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { CarriagesPageComponent } from './carriages-page/carriages-page.component';
import { StationsPagesComponent } from './stations-pages/stations-pages.component';
import { RoutesPageComponent } from './routes-page/routes-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'stations', component: StationsPagesComponent },
      { path: 'carriages', component: CarriagesPageComponent },
      { path: 'routes', component: RoutesPageComponent },
      { path: '', redirectTo: 'stations', pathMatch: 'full' },
    ],
  },
];

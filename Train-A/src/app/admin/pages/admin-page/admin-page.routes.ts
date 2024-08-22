import { Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { CarriagesPageComponent } from './carriages-page/carriages-page.component';
import { RoutesPageComponent } from './routes-page/routes-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
  },
  {
    path: 'carriages',
    component: CarriagesPageComponent,
  },
  {
    path: 'routes',
    component: RoutesPageComponent,
  },
];

import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { TripDetailComponent } from '../../components/trip-detali/trip-detali.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [{ path: 'trip/:rideId', component: TripDetailComponent }],
  },
];

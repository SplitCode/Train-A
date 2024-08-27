import { bootstrapApplication } from '@angular/platform-browser';
import { startServer } from '@planess/train-a-backend';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as L from 'leaflet';

startServer().then(() =>
  bootstrapApplication(AppComponent, {
    providers: appConfig.providers,
  }).catch((err) => console.error(err)),
);
L.Icon.Default.imagePath = '/assets/leaflet/';

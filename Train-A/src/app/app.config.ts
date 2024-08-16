import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideStore, StoreModule } from '@ngrx/store';
import { reducers } from './redux/reducers/index.reducer';
import { metaReducers } from './redux';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule, BrowserModule),
    provideStore(),
    importProvidersFrom(StoreModule.forRoot(reducers, { metaReducers })),
    provideStoreDevtools({
      maxAge: 25,
      autoPause: true,
      trace: true,
      traceLimit: 25,
      connectInZone: true,
    }),
  ],
};

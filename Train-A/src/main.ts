import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { startServer } from '@planess/train-a-backend';
import { metaReducers } from './app/redux';
import { reducers } from './app/redux/reducers/index.reducer';

startServer().then(() =>
  bootstrapApplication(AppComponent, {
    providers: [
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
  }).catch((err) => console.error(err)),
);

import { PRIME_NG_MODULES } from './app/shared/modules/prime-ng-modules';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { startServer } from '@planess/train-a-backend';
import { indexReducer, metaReducers } from './app/redux/reducers/index.reducer';

import { appConfig } from './app/app.config';

startServer().then(() =>
  bootstrapApplication(AppComponent, {
    providers: [
      PRIME_NG_MODULES.MessageService,
      ...appConfig.providers,
      importProvidersFrom(
        BrowserAnimationsModule,
        BrowserModule,
        StoreModule.forRoot(indexReducer, { metaReducers }),
      ),
      provideStore(indexReducer),
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

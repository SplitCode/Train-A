import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { CarriageService } from './admin/services/carriage.service';
import { CarriageEffects } from './redux/effects/carriage.effects';
import { UserEffects } from './redux/effects/user.effects';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { indexReducer, metaReducers } from './redux/reducers/index.reducer';
import { PRIME_NG_MODULES } from './shared/modules/prime-ng-modules';
import { StationsEffects } from './redux/effects/stations.effects';
import { RideService } from './home/services/ride.service';
import { RideEffects } from './redux/effects/ride.effects';
import { SearchEffects } from './redux/effects/search.effects';
import { RoutesEffects } from './redux/effects/routes.effects';
import { RoutesService } from './admin/services/routes.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    CarriageService,
    RideService,
    RoutesService,
    provideEffects([
      UserEffects,
      CarriageEffects,
      StationsEffects,
      RideEffects,
      SearchEffects,
      RoutesEffects,
    ]),
    PRIME_NG_MODULES.MessageService,
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
};

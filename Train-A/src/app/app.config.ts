import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { provideEffects } from '@ngrx/effects';
import { CarriageService } from './admin/services/carriage.service';
import { CarriageEffects } from './redux/effects/carriage.effects';
import { UserEffects } from './redux/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    CarriageService,
    provideEffects([UserEffects, CarriageEffects]),
  ],
};

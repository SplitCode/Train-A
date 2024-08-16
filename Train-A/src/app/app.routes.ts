import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/pages/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent,
      ),
  },
];

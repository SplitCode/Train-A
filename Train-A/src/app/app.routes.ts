import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/pages/home-page/home-page.routes').then((m) => m.routes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/pages/admin-page/admin-page.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./auth/pages/sign-in-page/sign-in-page.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./auth/pages/sign-up-page/sign-up-page.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./order/pages/order-page/order-page.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/pages/profile-page/profile-page.routes').then(
        (m) => m.routes,
      ),
  },
];

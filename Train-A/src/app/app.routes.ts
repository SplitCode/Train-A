import { Routes } from '@angular/router';
import { AdminGuard } from './admin/guards/admin.guard';

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
    canActivate: [AdminGuard],
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./auth/pages/sign-in-page/sign-in-page.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: 'signup',
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

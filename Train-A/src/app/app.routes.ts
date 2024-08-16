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
];

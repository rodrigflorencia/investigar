import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'select-test',
    loadComponent: () =>
      import('./features/select-test/select-test.page').then(
        (m) => m.SelectTestPage
      ),
  },
  {
    path: 'instructions-creativity/:code',
    loadChildren: () =>
      import('./features/creativity/creativity.routes').then(
        (m) => m.CREATIVITY_ROUTES,
      ),
  },
  {
    path: 'creativity',
    loadChildren: () =>
      import('./features/creativity/creativity.routes').then(
        (m) => m.CREATIVITY_ROUTES,
      ),
  },
  {
    path: 'more-info',
    loadComponent: () =>
      import('./features/more-info/more-info.component').then(
        (m) => m.MoreInfoComponent,
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-home.component').then((m) => m.AdminHomePage),
  },
  {
    path: 'rulit',
    loadChildren: () =>
      import('./features/rulit/rulit.routes').then((m) => m.RULIT_ROUTES),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule,
      ),
  },
];

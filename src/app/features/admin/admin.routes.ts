import { Routes } from '@angular/router';
import { adminAuthGuard } from 'src/app/core/auth.guard';
import { AdminHomePage } from './admin-home.component';
import { AdminCreativityPage } from './admin-creativity.component';
import { AdminRulitPage } from './admin-rulit.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [adminAuthGuard],
    children: [
      { path: '', component: AdminHomePage },
      { path: 'creativity', component: AdminCreativityPage },
      { path: 'rulit', component: AdminRulitPage },
    ]
  }
];

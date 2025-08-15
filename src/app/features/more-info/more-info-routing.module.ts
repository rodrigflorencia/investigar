import { Routes, RouterModule } from '@angular/router';
import { MoreInfoComponent } from './more-info.component';

export const routes: Routes = [
  {
    path: '',
    component: MoreInfoComponent
  }
];

export const MoreInfoRoutingModule = RouterModule.forChild(routes);

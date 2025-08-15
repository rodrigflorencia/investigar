import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageOkPrevTestComponent } from '../../features/creativity/message-ok-prev-test.component';

const routes: Routes = [
  {
    path: '',
    component: MessageOkPrevTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageOkPrevTestRoutingModule { }

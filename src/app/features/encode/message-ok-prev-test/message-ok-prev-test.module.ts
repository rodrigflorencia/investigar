import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageOkPrevTestRoutingModule } from './message-ok-prev-test-routing.module';
import { MessageOkPrevTestComponent } from '../../features/creativity/message-ok-prev-test.component';

@NgModule({
  imports: [
    CommonModule,
    MessageOkPrevTestRoutingModule,
    MessageOkPrevTestComponent // Import standalone component
  ]
})
export class MessageOkPrevTestModule { }

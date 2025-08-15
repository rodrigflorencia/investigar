import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfterTestRoutingModule } from './after-test-routing.module';
import { AfterTestComponent } from './components/after-test.component';

@NgModule({
  imports: [
    CommonModule,
    AfterTestRoutingModule,
    AfterTestComponent // Import standalone component
  ]
})
export class AfterTestModule { }

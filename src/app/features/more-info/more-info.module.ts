import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreInfoRoutingModule } from './more-info-routing.module';
import { BioComponent } from './bio.component';

@NgModule({
  declarations: [BioComponent],
  imports: [
    CommonModule,
    MoreInfoRoutingModule
  ]
})
export class MoreInfoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing';

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundRoutingModule,
        FormsModule,
        PageNotFoundComponent 
    ]
})

export class PageNotFoundModule {}

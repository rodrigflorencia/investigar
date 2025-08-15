import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




// Material Module
import { MaterialModule } from './material.module';
import { CarouselComponent } from './ui/carousel.component';



@NgModule({
    declarations: [

        // Only non-standalone components should be declared here
    ],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CarouselComponent,

        // Pipes
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CarouselComponent,

    ],
})
export class SharedModule { }

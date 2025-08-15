import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

// Material Module
import { MaterialModule } from './material/material.module';
import { FooterComponent } from '../layout/footer/footer.component';

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


        // Material Modules
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,

        // Pipes
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,

    ],
})
export class SharedModule { }

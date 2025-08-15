import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { BioComponent } from './bio.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-more-info',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FooterComponent,
        BioComponent,
    ],
    templateUrl: './more-info.component.html',
    styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent {
    constructor() { }
}

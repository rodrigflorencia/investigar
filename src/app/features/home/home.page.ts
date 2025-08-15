import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [

        RouterModule,
        SharedModule,
        FooterComponent,
    ],
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomeComponent {
    constructor() { }

    goITBA() {
        window.open('https://www.itba.edu.ar/');
    }
    goIBCN() {
        window.open('http://www.ibcn.fmed.uba.ar/');
    }
    goUNICEN() {
        window.open('http://www.unicen.edu.ar/');
    }
    goMediaLab() {
        window.open('http://medialab.com.ar/');
    }
    goTuxdi() {
        window.open(' https://tuxdi.com/');
    }

}

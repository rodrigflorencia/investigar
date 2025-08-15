import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header-dark-isologo',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
    ],
    templateUrl: './header-dark-isologo.component.html',
    styleUrls: ['./header-dark-isologo.component.scss']
})
export class HeaderDarkIsologoComponent {

  constructor() { }
    

}

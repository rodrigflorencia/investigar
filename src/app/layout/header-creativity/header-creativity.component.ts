import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-header-creativity',
    standalone: true,
    imports: [
        RouterModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './header-creativity.component.html',
    styleUrls: ['./header-creativity.component.scss']
})
export class HeaderCreativityComponent  {
  constructor() { }

}

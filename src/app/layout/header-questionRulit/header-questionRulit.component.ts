import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header-questionRulit',
    templateUrl: './header-questionRulit.component.html',
    styleUrls: ['./header-questionRulit.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
    ]
})
export class HeaderQuestionRulitComponent {

  constructor() { }

}

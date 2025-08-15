import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from 'src/app/features/rulit/services/rulit-navigation.service';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// Components
import { HeaderDarkComponent } from 'src/app/layout/header-dark/header-dark.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-select-test',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        HeaderDarkComponent,

    ],
    templateUrl: './select-test.page.html',
    styleUrls: ['./select-test.page.scss'],
    providers: [NavigationService],
})
export class SelectTestPage implements OnInit {
    isRulitOpen: boolean;

    constructor(private readonly _navigationService: NavigationService) { }

    ngOnInit(): void {
        this.isRulitOpen = this._navigationService.isRulitOpen;
        this._navigationService.rulitConfigChanged$.subscribe({
            next: (config) => (this.isRulitOpen = config.IS_TEST_OPEN),
        });
    }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';
import { HeaderAdminComponent } from 'src/app/layout/header-admin/header-admin.component';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderAdminComponent,
    ...MATERIAL_IMPORTS,
  ],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminHomePage {
 versionNumber = 2;
  auth = inject(AuthService);
}

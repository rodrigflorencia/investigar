import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from 'src/app/layout/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    MatCardModule,
    MatIconModule,
    FooterComponent,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomeComponent {
  constructor() {}

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

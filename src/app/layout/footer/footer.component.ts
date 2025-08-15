import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

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

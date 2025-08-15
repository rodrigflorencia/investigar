import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from 'src/app/layout/header/header.component';

@Component({
  selector: 'app-after-test',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent,
  ],
  templateUrl: './after-test.component.html',
  styleUrls: ['./after-test.component.scss'],
})
export class AfterTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

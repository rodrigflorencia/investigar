import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from 'src/app/layout/header/header.component';

@Component({
  selector: 'app-message-ok-prev-test',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HeaderComponent,
  ],
  templateUrl: './message-ok-prev-test.component.html',
  styleUrls: ['./message-ok-prev-test.component.scss'],
})
export class MessageOkPrevTestComponent implements OnInit {
  load = false;

  constructor(private router: Router) {}
  startTest() {
    // Navigate to the creativity test page
    this.router.navigate(['/creativity/test']);
  }
  ngOnInit(): void {
    
  }
}

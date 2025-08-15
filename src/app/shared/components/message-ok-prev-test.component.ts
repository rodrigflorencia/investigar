import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-ok-prev-test',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './message-ok-prev-test.component.html',
  styleUrls: ['./message-ok-prev-test.component.scss']
})
export class MessageOkPrevTestComponent implements OnInit {
  private nextRoute: string = '/creativity/test';

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the next route from route data or use default
    this.nextRoute = this._route.snapshot.data['nextRoute'] || this.nextRoute;
  }

  startTest(): void {
    this._router.navigate([this.nextRoute]);
  }
}

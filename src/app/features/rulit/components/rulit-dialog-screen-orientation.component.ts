import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rulit-dialog-screen-orientation',
  templateUrl: './rulit-dialog-screen-orientation.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
})
export class RulitDialogScreenOrientationComponent {
  constructor(
    public dialogRef: MatDialogRef<RulitDialogScreenOrientationComponent>,
  ) {}
}

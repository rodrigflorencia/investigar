import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-orientation-dialog',
  templateUrl: 'orientation-dialog.html',
  standalone: true,
})
export class ScreenOrientationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ScreenOrientationDialogComponent>,
  ) {}
}

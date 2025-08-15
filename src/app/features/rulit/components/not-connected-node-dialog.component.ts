import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-not-connected-node-dialog',
  templateUrl: 'not-connected-node-dialog.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class NotConnectedNodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NotConnectedNodeDialogComponent>,
  ) {}

  close() {
    this.dialogRef.close();
  }
}

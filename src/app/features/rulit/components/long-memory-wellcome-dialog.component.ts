import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

interface DialogData {
  userName: string;
  message: string;
}

@Component({
  selector: 'app-long-memory-wellcome-dialog',
  templateUrl: 'long-memory-wellcome-dialog.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class LongMemoryWellcomeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LongMemoryWellcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}

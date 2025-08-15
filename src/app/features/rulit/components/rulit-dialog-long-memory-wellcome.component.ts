import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';
import { LongMemoryDialogData } from '../models/rulit.model';

@Component({
  selector: 'app-rulit-dialog-long-memory-wellcome',
  templateUrl: './rulit-dialog-long-memory-wellcome.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
})
export class RulitDialogLongMemoryWellcomeComponent {
  constructor(
    public dialogRef: MatDialogRef<RulitDialogLongMemoryWellcomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LongMemoryDialogData,
  ) {}
}

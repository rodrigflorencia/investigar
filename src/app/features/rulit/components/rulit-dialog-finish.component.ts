import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';
import { DialogData } from '../models/rulit.model';

@Component({
  selector: 'app-rulit-dialog-finish',
  templateUrl: './rulit-dialog-finish.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
})
export class RulitDialogFinishComponent {
  constructor(
    public dialogRef: MatDialogRef<RulitDialogFinishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly router: Router
  ) {}

  onClose(): void {
    this.dialogRef.close();
    this.router.navigate(['/select-test']); // Navigate to select-test as per other components
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from 'src/app/shared/ui/material.imports';

@Component({
  selector: 'app-rulit-dialog-not-connected-node',
  templateUrl: './rulit-dialog-not-connected-node.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS
  ],
})
export class RulitDialogNotConnectedNodeComponent {
  constructor(
    public dialogRef: MatDialogRef<RulitDialogNotConnectedNodeComponent>,
  ) {}

  close() {
    this.dialogRef.close();
  }
}

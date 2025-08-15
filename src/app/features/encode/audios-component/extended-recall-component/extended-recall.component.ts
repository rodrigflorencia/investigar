import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-extended-recall',
    templateUrl: './extended-recall.component.html',
    styleUrls: ['extended-recall.component.scss', '../../encode.component.scss'],
    standalone: false
})
export class ExtendedRecallComponent {

  constructor(public dialogRef: MatDialogRef<ExtendedRecallComponent>)
  {
  }

  onExtend(result: boolean): void {
    this.dialogRef.close(result);
  }

}

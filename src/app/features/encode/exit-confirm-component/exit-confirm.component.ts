import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-exit-confirm',
    templateUrl: './exit-confirm.component.html',
    styleUrls: ['../encode.component.scss', 'exit-confirm.component.scss'],
    standalone: false
})
export class ExitConfirmComponent {

  constructor(public dialogRef: MatDialogRef<ExitConfirmComponent>)
  {
  }

  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }

}

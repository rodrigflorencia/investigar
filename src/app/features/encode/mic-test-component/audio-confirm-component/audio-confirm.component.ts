import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-audio-confirm',
    templateUrl: './audio-confirm.component.html',
    styleUrls: ['audio-confirm.component.scss', '../../encode.component.scss'],
    standalone: false
})
export class AudioConfirmComponent {

  constructor(public dialogRef: MatDialogRef<AudioConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public audio: SafeResourceUrl)
  {
  }

  onClose(result: boolean): void {
    this.dialogRef.close(result);
    this.audio = null;
  }

}

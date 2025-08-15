import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-audio-disclaimer',
    templateUrl: './audio-disclaimer.component.html',
    styleUrls: ['audio-disclaimer.component.scss', '../../encode.component.scss'],
    standalone: false
})
export class AudioDisclaimerComponent {

  constructor(private _dialogRef: MatDialogRef<AudioDisclaimerComponent>)
  {
    _dialogRef.disableClose = true;
  }

  onClose(result: boolean): void {
    this._dialogRef.close(result);
  }

}

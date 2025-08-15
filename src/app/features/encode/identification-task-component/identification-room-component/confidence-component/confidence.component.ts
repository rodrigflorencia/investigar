import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confidende-dialog',
    templateUrl: './confidence.component.html',
    styleUrls: ['confidence.component.scss', '../../../encode.component.scss'],
    standalone: false
})
export class ConfidenceDialogComponent {

  private _suspectPhotoUrl: string;
  private _confidenceLevel = 0;

  @Input()
  set suspectPhotoUrl(suspectPhotoUrl: string) {
    this._suspectPhotoUrl = suspectPhotoUrl;
  }

  get suspectPhotoUrl(): string {
    return this._suspectPhotoUrl;
  }

  set confidenceLevel(level: number) {
    this._confidenceLevel = level;
  }

  get confidenceLevel(): number {
    return this._confidenceLevel;
  }

  constructor(public dialogRef: MatDialogRef<ConfidenceDialogComponent>)
  {
  }

  submitConfidenceLevel(result: number|boolean): void {
    this.dialogRef.close(result);
  }

}

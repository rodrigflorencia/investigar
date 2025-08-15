import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-my-dialog',
    templateUrl: './my-dialog.component.html',
    styleUrls: ['./my-dialog.component.scss'],
    standalone: false
})
export class MyDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

              }

  ngOnInit(): void {
    // this.dialogRef.backdropClick();
    // this.dialogRef.open();
    //   backdrop  : 'static',
    //   keyboard  : false
  }


  goTest() {
    this.dialogRef.close();
  }
}


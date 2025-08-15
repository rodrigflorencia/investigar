import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEncodeSuspect } from '../../models/IEncodeSuspect';
import { ABSENT_SUSPECT_ID, ROOM_1_TITLE, ROOM_2_TITLE } from '../../constants';
import { IEncodeIdentificationResponse } from '../../models/IEncodeIdentificationResponse';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfidenceDialogComponent } from './confidence-component/confidence.component';
import { lastValueFrom, Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-encode-identification-room',
    templateUrl: './identification-room.component.html',
    styleUrls: ['./identification-room.component.scss', '../../encode.component.scss'],
    standalone: false
})
export class EncodeIdentificationRoomComponent implements OnInit {

  private _lineup: Array<IEncodeSuspect>;
  private _selectedSuspect: IEncodeSuspect;

  selectedSuspectSource = new Subject<IEncodeSuspect>();
  selectedSuspect$: Observable<IEncodeSuspect|null>;

  @Input()
  roomTitle: typeof ROOM_1_TITLE| typeof ROOM_2_TITLE;

  @Input()
  set lineup(lineup: Array<IEncodeSuspect>) {
    // place the absent suspect option last
    const asi = lineup.findIndex(suspect => suspect.id === ABSENT_SUSPECT_ID);
    lineup.push(lineup.splice(asi, 1)[0]);

    this._lineup = lineup;
    this.selectedSuspectSource.next(null);
  }

  @Output()
  suspectIdentifiedEvent = new EventEmitter<IEncodeIdentificationResponse>();

  get lineup(): Array<IEncodeSuspect> {
    return this._lineup;
  }

  constructor(private _dialogService: MatDialog)
  {
  }

  ngOnInit(): void {
    this.selectedSuspect$ = this.selectedSuspectSource.asObservable();
    this.selectedSuspect$.subscribe(this._selectedSuspectChange$);
  }

  async identifySuspect(): Promise<void> {
    const confidenceDialogConfig: MatDialogConfig = {
      disableClose: true,
      closeOnNavigation: false,
    };

    const confidenceDialogRef = this._dialogService.open(ConfidenceDialogComponent, confidenceDialogConfig);
    confidenceDialogRef.componentInstance.suspectPhotoUrl = this._selectedSuspect.photoImageUrl;

    const dialogClose$ = confidenceDialogRef.afterClosed();
    dialogClose$.subscribe(this._confidenceDialogClose$);
    await lastValueFrom(dialogClose$);

    confidenceDialogRef.close();
  }

  private _selectedSuspectChange$ = (suspect: IEncodeSuspect | null) => {
    this._selectedSuspect = suspect;
  };

  private _confidenceDialogClose$ = (confidenceResponse: number|boolean): void => {
    if (typeof confidenceResponse === 'number') {
      const identificationResponse: IEncodeIdentificationResponse = {
        selectedSuspect: this._selectedSuspect,
        confidenceLevel: confidenceResponse
      };

      this.suspectIdentifiedEvent.emit(identificationResponse);
      this.suspectIdentifiedEvent.complete();
    }
  };

}

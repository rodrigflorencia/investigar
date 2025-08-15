import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEncodeInMemoryAudio } from '../models/IEncodeInMemoryAudio';
import { AudioRecorderService } from '../services/AudioRecorderService';
import { AudioConfirmComponent } from './audio-confirm-component/audio-confirm.component';
import { SessionsEnum } from '../constants';
import { EncodeUserService } from '../services/EncodeUserService';

@Component({
    selector: 'app-encode-mic-test',
    templateUrl: './mic-test.component.html',
    styleUrls: ['mic-test.component.scss', '../encode.component.scss'],
    standalone: false
})

export class EncodeMicTestComponent implements OnInit, OnDestroy {

  private _audioUrl: SafeResourceUrl;
  private _newAudio$: Subscription;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _recorderService: AudioRecorderService,
              private _sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private _userService: EncodeUserService)
  {
  }

  ngOnInit(): void
  {
    this._recorderService.deleteAudioAt(0);
    this._newAudio$ = this._recorderService.audioListChanged$.subscribe(
      {
        next: (newAudio: IEncodeInMemoryAudio) => {
          if (this._recorderService.audioCount === 1)
          {
            const audioData = this._recorderService.getAudioAt(0);
            this._audioUrl = this._createAudioUrl(audioData);
            this._openDialog();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._newAudio$.unsubscribe();
  }

  private _createAudioUrl(audioData: IEncodeInMemoryAudio): SafeResourceUrl
  {
    const audioUrl = URL.createObjectURL(audioData.rawData);
    return this._sanitizer.bypassSecurityTrustUrl(audioUrl);
  }

  private _openDialog(): void {
    const dialogRef = this.dialog.open(AudioConfirmComponent, {
      data: this._audioUrl
    });

    dialogRef.afterClosed().subscribe(this._dialogClosedObserver);
  }

  onConfirm(): void
  {
    if (this._userService.session == SessionsEnum.SessionTwo)
    {
      this._router.navigate(['../somnolence-degree'], { relativeTo: this._route });
      return;
    }

    if (this._userService.session == SessionsEnum.SessionOne)
    {
      this._router.navigate(['../consent'], { relativeTo: this._route });
      return;
    }
  }

  private _dialogClosedObserver = (result: boolean) => {
    (result == true) ? this.onConfirm() : this._recorderService.deleteAudioAt(0);
  };

}

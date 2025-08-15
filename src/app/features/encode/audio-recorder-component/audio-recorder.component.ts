import { Component, OnInit } from '@angular/core';
import { RecorderStatus } from '../constants';
import { AudioRecorderService } from '../services/AudioRecorderService';
import { AudioDisclaimerComponent } from './audio-disclaimer-component/audio-disclaimer.component';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';

@Component({
    selector: 'app-audio-recorder',
    templateUrl: './audio-recorder.component.html',
    styleUrls: ['audio-recorder.component.scss', '../encode.component.scss'],
    standalone: false
})
export class AudioRecorderComponent implements OnInit {

  private _navigator: Navigator;
  private _stream: MediaStream;
  private _disclaimerDialog: MatDialogRef<AudioDisclaimerComponent>;

  status: RecorderStatus;
  recorderService: AudioRecorderService;

  constructor(private _recorder: AudioRecorderService, private _dialog: MatDialog)
  {
    this._navigator = navigator;
    this.recorderService = _recorder;
    this.status = RecorderStatus.Ready;
  }

  ngOnInit(): void
  {
  }

  onRecButtonPressed(): void {
    if (this.recorderService.isRecording)
    {
      this._stopRecording();
      return;
    }

    if (!this.recorderService.isRecording) {
      this._startRecording();
      return;
    }
  }

  private async _startRecording(): Promise<void>
  {
    if (!this.recorderService.isRecording)
    {
      try {
        this._openDisclaimerDialog();
        this._stream = await this._navigator.mediaDevices.getUserMedia({audio: true, video: false});
        if (this._disclaimerDialog.getState() === MatDialogState.OPEN) {
          this._disclaimerDialog.close();
        }
        this.recorderService.record(this._stream);
        this.status = RecorderStatus.Recording;
      } catch (error) {
        if (this._disclaimerDialog.getState() === MatDialogState.CLOSED) {
          this._openDisclaimerDialog();
        }
      }
    }
  }

  private _stopRecording(): void
  {
    if (this.recorderService.isRecording)
    {
      this.recorderService.stopRecording();
      this._stream.getTracks().forEach( track => track.stop() );
      this.status = RecorderStatus.Ready;
    }
  }

  private _openDisclaimerDialog(): void {
    this._disclaimerDialog = this._dialog.open(AudioDisclaimerComponent, {
      width: '580px'
    });
  }
}

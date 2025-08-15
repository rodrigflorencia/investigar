import { Component } from '@angular/core';
import { EncodeUserService } from '../services/EncodeUserService';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { OnExit } from '../exit.guard';
import { ExitConfirmComponent } from '../exit-confirm-component/exit-confirm.component';
import { VideoState, VIDEO_PATH } from '../constants';
import { EncodeVideoPlayerComponent } from './video-player/video-player.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-encode-video',
  templateUrl: './video.component.html',
  styleUrls: ['video.component.scss', '../encode.component.scss'],
  standalone: false,
})
export class EncodeVideoComponent implements OnExit {
  private _videoPlayerRef: MatDialogRef<EncodeVideoPlayerComponent>;
  private videoLaunched = false;

  constructor(
    private _userService: EncodeUserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
  ) {}

  async onExit(): Promise<any> {
    const exitDialogRef = this._dialog.open(ExitConfirmComponent);
    exitDialogRef.afterClosed().subscribe(this._exitDialogClosed$);
    const exit$ = exitDialogRef.afterClosed();
    return await lastValueFrom(exit$);
  }

  get videoSource(): string {
    return VIDEO_PATH;
  }

  async onVideoLaunched() {
    const videoPlayerDialogConfig: MatDialogConfig = {
      disableClose: true,
      closeOnNavigation: false,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-background',
    };

    this._videoPlayerRef = this._dialog.open(
      EncodeVideoPlayerComponent,
      videoPlayerDialogConfig,
    );
    this._videoPlayerRef.componentInstance.videoState = VideoState.Play;
    this._videoPlayerRef
      .afterClosed()
      .subscribe(this._videoPlayerDialogClosed$);
    this.videoLaunched = true;
  }

  skipVideo() {
    this._navigateToAudios();
  }

  private _navigateToAudios() {
    this.onExit = async () => true;
    this._router.navigate(['../audios'], { relativeTo: this._route });
  }

  private _videoPlayerDialogClosed$ = async (result: boolean) => {
    result == true ? this._navigateToAudios() : this.userAbandoned();
  };

  private async userAbandoned() {
    await this._userService.abandonTest();
    this._router.navigate(['/']);
  }

  private _exitDialogClosed$ = async (response: boolean): Promise<boolean> => {
    if (response == true) {
      if (this.videoLaunched) {
        this._videoPlayerRef.close(false);
      }
      await this._userService.abandonTest();
      this._router.navigate(['/']);
    }

    this._videoPlayerRef.componentInstance.videoState = VideoState.Play;
    return false;
  };
}

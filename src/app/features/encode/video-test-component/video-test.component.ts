import { Component, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HeaderEncodeComponent } from '../../layout/header-encode/header-encode.component';

@Component({
  selector: 'app-encode-video-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    HeaderEncodeComponent,
  ],
  templateUrl: './video-test.component.html',
  styleUrls: ['video-test.component.scss', '../encode.component.scss'],
})
export class EncodeVideoTestComponent {
  isVideoPlaying = false;
  isVideoGood = true;
  isAudioGood = true;

  @ViewChild('videoPlayer', { static: true })
  private _video: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnInit(): void {
    this._video.nativeElement.volume = 0.8;
    this.playVideo();
  }

  playVideo(): void {
    this._video.nativeElement.play();
    this.isVideoPlaying = true;
  }

  pauseVideo(): void {
    this._video.nativeElement.pause();
    this.isVideoPlaying = false;
  }
}

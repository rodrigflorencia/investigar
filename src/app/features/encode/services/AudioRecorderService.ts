import { Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { REC_OPTIONS } from '../constants';
import { IEncodeAudio } from '../models/IEncodeAudio';
import { IAudioRecorder } from './IAudioRecorderService';
import { IEncodeInMemoryAudio } from '../models/IEncodeInMemoryAudio';
import { EncodeUserService } from './EncodeUserService';

@Injectable({
    providedIn: 'root'
})
export class AudioRecorderService implements IAudioRecorder {

    private _audioList: Array<IEncodeInMemoryAudio>;
    private _mediaRecorder: MediaRecorder;
    private _recordedChunks;
    isRecording: boolean;
    audioListChanged$: Subject<IEncodeAudio>;

    constructor(private _userService: EncodeUserService)
    {
        this._audioList = new Array<IEncodeInMemoryAudio>();
        this.isRecording = false;
        this.audioListChanged$ = new Subject<IEncodeAudio>();
        this._recordedChunks = [];
    }

    get audioCount(): number
    {
        return this._audioList.length;
    }

    record(stream: MediaStream): void
    {
        this._mediaRecorder = new MediaRecorder(stream, REC_OPTIONS);
        this.isRecording = true;

        const dataAvailable$ = fromEvent(this._mediaRecorder,'dataavailable');
        dataAvailable$.subscribe((e: BlobEvent) => {
            if (e.data.size > 0)
            {
                this._recordedChunks.push(e.data);
            }
        });

        const stop$ = fromEvent(this._mediaRecorder,'stop');
        stop$.subscribe((e: Event) => {
            const audioData: Blob = new Blob(this._recordedChunks, {type: 'audio/webm'});
            const audioId = this._createAudioId();
            const newAudio: IEncodeInMemoryAudio = { id: audioId , rawData: audioData, downloadURL: null};
            this._audioList.push(newAudio);
            this.audioListChanged$.next(newAudio);
            this._recordedChunks = [];
        });

        this._mediaRecorder.start();
    }

    stopRecording(): void
    {
        this.isRecording = false;
        this._mediaRecorder.stop();
    }

    getAudioAt(index: number): IEncodeInMemoryAudio | null
    {
        if (this._audioList.length > index)
        {
            return this._audioList[index];
        }

        return null;
    }

    getAudios(): Array<IEncodeAudio>
    {
        return this._audioList;
    }

    deleteAudioAt(index: number): void {
        if (this._audioList.length > index)
        {
            this._audioList.splice(index,1);
        }
    }

    private _createAudioId(): string {
        const audioNum = this._audioList.length;
        return String(audioNum).padStart(3, '0') + '_' + this._userService.user.uid;
    }
}

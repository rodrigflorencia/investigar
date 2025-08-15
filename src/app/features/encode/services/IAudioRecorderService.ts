import { Subject } from 'rxjs';
import { IEncodeAudio } from '../models/IEncodeAudio';

export interface IAudioRecorder {
    isRecording: boolean;
    audioCount: number;
    audioListChanged$: Subject<IEncodeAudio>;
    record(stream: MediaStream): void;
    stopRecording(): void;
    getAudioAt(index: number): IEncodeAudio | null;
    getAudios(): Array<IEncodeAudio>;
    deleteAudioAt(index: number): void;
}

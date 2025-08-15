import { IEncodeAudio } from './IEncodeAudio';

export interface IEncodeInMemoryAudio extends IEncodeAudio {
    rawData: Blob;
}

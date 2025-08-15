import { SomnolenceDegree } from '../constants';
import { IEncodeAudio } from './IEncodeAudio';

export interface IEncodeSessionOne {
    completed: boolean;
    somnolenceDegree: SomnolenceDegree | null;
    audios: Array<IEncodeAudio> | null;
}

import { PerpetratorCondition, SomnolenceDegree } from '../constants';
import { IEncodeIdentificationResponse } from './IEncodeIdentificationResponse';
import { IEncodeAudio } from './IEncodeAudio';
import { IEncodeScreenshot } from './IEncodeScreenshot';

export interface IEncodeSessionTwo {
    completed: boolean | null;
    perpetratorCondition: PerpetratorCondition | null;
    somnolenceDegree: SomnolenceDegree;
    // todo
    // usar un array de dos posiciones para representar la condicion ?
    // perpetratorCondition: Array<typeof PERPETRATOR_1_ID | typeof PERPETRATOR_2_ID>;
    identificationResponse:  IEncodeIdentificationResponse[] | null;
    audios: Array<IEncodeAudio> | null;
    imageSelectionResponse: IEncodeScreenshot[] | null;
    imageSortingResponse: IEncodeScreenshot[] | null;
}

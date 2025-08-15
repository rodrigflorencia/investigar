import { IEncodeSuspect } from './IEncodeSuspect';

export interface IEncodeIdentificationResponse {
    selectedSuspect: IEncodeSuspect;
    confidenceLevel: number;
}

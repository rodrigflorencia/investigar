import { IEncodeGoogleFormResponse } from './IEncodeGoogleFormResponse';
import { IEncodeSessionOne } from './IEncodeSessionOne';
import { IEncodeSessionTwo } from './IEncodeSessionTwo';
import { IEncodeUserPersonalInfo } from './IEncodeUserPersonalInfo';
import { IEncodeUserHealthInfo } from './IEncodeUserHealthInfo';
import { IEncodeUserConsent } from './IEncodeUserConsent';
import { FieldValue } from 'firebase/firestore';

// EncodeUser stored in DB
export interface IEncodeUser {
    uid: string;
    name: string;
    email: string;
    creationDate: Date | FieldValue | any ;
    googleFormsResponses: IEncodeGoogleFormResponse[] | null;
    personalInfo: IEncodeUserPersonalInfo | null;
    sessionOne: IEncodeSessionOne;
    sessionTwo: IEncodeSessionTwo;
    healthInfo: IEncodeUserHealthInfo | null;
    abandonedByUser: boolean | null;
    consent: IEncodeUserConsent;
}

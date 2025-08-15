import { PERPETRATOR_1_ID, PERPETRATOR_2_ID } from '../constants';

export interface IEncodeSuspect {
    id: string | null;
    photoImageUrl: string | null;
    photoStorageRef: string;
    isPerpetrator: boolean;
    suspectOfBeing: typeof PERPETRATOR_1_ID | typeof PERPETRATOR_2_ID | null;
}

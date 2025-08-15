import { EducationLevel, Gender } from '../constants';

export interface IEncodeUserPersonalInfo {
    age: number;
    gender: Gender;
    educationLevel: EducationLevel;
    ongoingCareer: string | null;
    occupation: string | null;
}

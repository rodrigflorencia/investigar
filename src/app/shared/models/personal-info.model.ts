import { EducationLevel, Gender } from "../constants";

export interface UserPersonalInfo {
    age: number;
    gender: Gender;
    educationLevel: EducationLevel;
    ongoingCareer: string | null;
    occupation: string | null;
}

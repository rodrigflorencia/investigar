import { Gender, EducationLevel } from '../constants';

export interface UserPersonalInfo {
  id?: string;
  name: string;
  age: number;
  gender: Gender;
  educationLevel: EducationLevel;
  occupation: string;
  city: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User extends UserPersonalInfo {
  testResults?: any; // Define a more specific type based on your test results structure
  completedTests?: string[];
  lastActive?: Date;
}

export interface UserStats {
  totalUsers: number;
  usersByGender: Record<Gender, number>;
  usersByEducation: Record<EducationLevel, number>;
  averageAge: number;
}

export interface Element {
    id: number;
    name: string;
    image: string;
    code: string;
}
export interface Clock {
    seconds: number;
    state: string;
    minutes: number;
    limit: number;
}

export enum Gender {
    Male = 'Masculino',
    Female = 'Femenino',
    NonBinary = 'No Binario'
}

export enum EducationLevel {
    incompleteSecondary = 'Secundario incompleto',
    completeSecondary = 'Secundario completo',
    incompleteTertiary = 'Terciario incompleto',
    completeTertiary = 'Terciario completo',
    incompleteBachelors = 'Universitario incompleto',
    completeBachelors = 'Universitario completo'
}


export interface CreativeUser {
    nameLastName: any;
    age: any;
    city: any;
    educationLevel: any;
    educationStatus: any;
    school: any;
    degree: any;
    year: any;
    grade: any;
    course: any;
    object: any;
    proposal: any[];
    dateStart: any;
    dateEnd: any;
}
export interface TestCreativity {
    id: number;
    name: string;
}
export interface Student {
    id: number;
    matricule: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: 'M' | 'F';
    dateOfBirth?: string;
    phone?: string;
    address?: string;
    studentStatus: StudentStatus;
    regime: StudentRegime;
    programId?: number;
    programName?: string;
    levelCode?: string;
    levelId?: number;
    departmentId?: number;
    classId?: number;
    promotion?: string;
    createdAt: string;
    updatedAt?: string;
}

export type StudentStatus = 'REGULAR' | 'REPEATING' | 'WITH_DEBT' | 'GRADUATED' | 'DROPPED';
export type StudentRegime = 'FULL_TIME' | 'PART_TIME';

export interface StudentCreateRequest {
    matricule: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'M' | 'F';
    dateOfBirth?: string;
    phone?: string;
    address?: string;
    studentStatus?: StudentStatus;
    regime?: StudentRegime;
    programId?: number;
    programName?: string;
    levelCode?: string;
    levelId?: number;
    departmentId?: number;
    classId?: number;
    promotion?: string;
}

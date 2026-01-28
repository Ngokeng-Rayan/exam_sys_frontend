export interface Department {
    id: number;
    code: string;
    name: string;
    description?: string;
    headId?: number;
}

export interface Program {
    id: number;
    code: string;
    name: string;
    departmentId: number;
    duration?: number;
    totalCredits?: number;
    degreeType?: string;
    description?: string;
    department?: Department;
}

export interface Level {
    id: number;
    code: string;
    name: string;
    levelNumber?: number;
    programId?: number;
    program?: Program;
}

export interface AcademicYear {
    id: number;
    name: string;
    code: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
}

export interface Semester {
    id: number;
    name: string;
    number: number;
    startDate: string;
    endDate: string;
    academicYearId: number;
    isCurrent: boolean;
    academicYear?: AcademicYear;
}

export interface UE {
    id: number;
    code: string;
    name: string;
    levelId: number;
    semesterNumber: number;
    totalCredits: number;
    coefficient: number;
    ueType?: string;
    programId?: number;
    departmentId?: number;
    description?: string;
    isActive: boolean;
    level?: Level;
    program?: Program;
    department?: Department;
    ecues?: ECUE[];
}

export interface ECUE {
    id: number;
    code: string;
    name: string;
    ueId: number;
    credits: number;
    coefficient: number;
    hoursCM?: number;
    hoursTD?: number;
    hoursTP?: number;
    ccWeight: number;
    examWeight: number;
    eliminationThreshold?: number;
    validationThreshold?: number;
    isOptional: boolean;
    isEliminatory: boolean;
    eliminatoryThreshold?: number;
    allowsDispensation: boolean;
    isActive: boolean;
    description?: string;
    ue?: UE;
}

export interface ClassRoom {
    id: number;
    code: string;
    name: string;
    levelId: number;
    programId: number;
    academicYearId: number;
    maxStudents: number;
    currentStudents: number;
    classDelegateId?: number;
    classroom?: string;
    isActive: boolean;
    description?: string;
    level?: Level;
    program?: Program;
    academicYear?: AcademicYear;
}

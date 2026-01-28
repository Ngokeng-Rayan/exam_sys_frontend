export interface Result {
    id: number;
    studentId: number;
    semesterId: number;
    programId: number;
    levelId: number;
    classId?: number;
    departmentId?: number;
    academicYearId: number;
    overallAverage: number;
    totalCredits: number;
    acquiredCredits: number;
    rank?: number;
    status: ResultStatus;
    comments?: string;
    subjectAverages?: any;
    subjectRanks?: any;
    calculatedAt?: string;
    calculatedBy?: number;
    student?: any;
    semester?: any;
    program?: any;
    level?: any;
    class?: any;
    department?: any;
    academicYear?: any;
}

export type ResultStatus = 'PASS' | 'FAIL' | 'CONDITIONAL' | 'PENDING';

export interface Mention {
    id: number;
    code: string;
    name: string;
    minAverage: number;
    maxAverage: number;
    color?: string;
    order: number;
    isActive: boolean;
}

export interface AcademicDecision {
    id: number;
    studentId: number;
    semesterId: number;
    academicYearId: number;
    levelId: number;
    programId: number;
    decisionType: DecisionType;
    mentionId?: number;
    overallAverage: number;
    totalCredits: number;
    acquiredCredits: number;
    rank?: number;
    totalStudents?: number;
    ueAverages?: any;
    ecueDetails?: any;
    decisionDate?: string;
    decidedBy?: number;
    comments?: string;
    isFinal: boolean;
    finalizedAt?: string;
    student?: any;
    semester?: any;
    academicYear?: any;
    level?: any;
    program?: any;
    mention?: Mention;
}

export type DecisionType = 'PASS' | 'FAIL' | 'CONDITIONAL' | 'REPEAT' | 'EXCLUDE';

export interface Palmares {
    id: number;
    studentId: number;
    academicYearId: number;
    semesterId?: number;
    levelId: number;
    programId: number;
    palmaresType: PalmaresType;
    ueId?: number;
    ecueId?: number;
    average: number;
    rank: number;
    mentionId?: number;
    awardedAt?: string;
    isPublished: boolean;
    student?: any;
    academicYear?: any;
    semester?: any;
    level?: any;
    program?: any;
    ue?: any;
    ecue?: any;
    mention?: Mention;
}

export type PalmaresType = 'GENERAL' | 'UE' | 'ECUE' | 'SEMESTER' | 'ANNUAL';

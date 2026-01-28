export interface Grade {
    id: number;
    studentId: number;
    ecueId: number;
    semesterId: number;
    classId?: number;
    academicYearId: number;
    gradeCC1?: number;
    gradeCC2?: number;
    gradeCC?: number;
    gradeExam?: number;
    gradeFinal?: number;
    gradeRattrapage?: number;
    status: GradeStatus;
    sessionType?: SessionType;
    passedWithRattrapage?: boolean;
    isAbsent?: boolean;
    isAbsentCC1?: boolean;
    isAbsentCC2?: boolean;
    isAbsentRattrapage?: boolean;
    absenceJustified?: boolean;
    absenceJustifiedCC1?: boolean;
    absenceJustifiedCC2?: boolean;
    absenceJustifiedRattrapage?: boolean;
    retakeSession?: string;
    calculationMethod?: string;
    isFraud?: boolean;
    isDispensed?: boolean;
    dispensedReason?: string;
    isEliminated?: boolean;
    eliminationReason?: string;
    teacherComment?: string;
    validationComment?: string;
    chefDeptComment?: string;
    responsableComment?: string;
    enteredBy?: number;
    validatedBy?: number;
    validatedByChefDept?: number;
    validatedByResponsable?: number;
    lastModifiedBy?: number;
    validatedAt?: string;
    validatedAtPedagogical?: string;
    validatedAtAdministrative?: string;
    submittedAt?: string;
    teacherAssignmentId?: number;
    student?: any;
    ecue?: any;
    semester?: any;
    academicYear?: any;
    class?: any;
}

export type GradeStatus = 'DRAFT' | 'SUBMITTED' | 'VALIDATED_PEDAGOGICAL' | 'VALIDATED_ADMINISTRATIVE' | 'FINAL' | 'REJECTED';
export type SessionType = 'NORMAL' | 'RATTRAPAGE';

export interface GradeCreateRequest {
    studentId: number;
    ecueId: number;
    semesterId: number;
    academicYearId: number;
    gradeCC1?: number;
    gradeCC2?: number;
    gradeExam?: number;
    isAbsentCC1?: boolean;
    isAbsentCC2?: boolean;
    absenceJustifiedCC1?: boolean;
    absenceJustifiedCC2?: boolean;
    teacherComment?: string;
}

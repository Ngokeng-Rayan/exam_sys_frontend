export interface Teacher {
    id: number;
    matricule: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    gender: 'M' | 'F';
    dateOfBirth?: string;
    phone?: string;
    address?: string;
    grade?: string;
    specialty?: string;
    teacherType?: TeacherType;
    departmentId?: number;
    departmentName?: string;
    userId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export type TeacherType = 'PERMANENT' | 'CONTRACTUAL' | 'VISITING';

export interface TeacherAssignment {
    id: number;
    teacherId: number;
    ecueId: number;
    classId?: number;
    semesterId: number;
    academicYearId: number;
    departmentId?: number;
    assignmentType?: string;
    isPrimary: boolean;
    notes?: string;
    teacher?: Teacher;
    ecue?: any;
    class?: any;
}

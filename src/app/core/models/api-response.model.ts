export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
}

export interface PaginatedResponse<T = any> {
    data: T[];
    meta: PaginationMeta;
}

export interface PaginationMeta {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
}

export interface Statistics {
    totalStudents?: number;
    totalTeachers?: number;
    totalDepartments?: number;
    totalPrograms?: number;
    enrollmentTrend?: any[];
    successRateByDepartment?: any[];
    recentActivities?: any[];
}

export interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    data?: any;
    readAt?: string;
    createdAt: string;
}

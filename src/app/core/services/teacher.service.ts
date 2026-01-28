import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Teacher, TeacherAssignment, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    private apiUrl = `${environment.apiUrl}/teachers`;

    constructor(private http: HttpClient) { }

    getTeachers(params?: any): Observable<ApiResponse<PaginatedResponse<Teacher>>> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<ApiResponse<PaginatedResponse<Teacher>>>(this.apiUrl, { params: httpParams });
    }

    getTeacher(id: number): Observable<ApiResponse<Teacher>> {
        return this.http.get<ApiResponse<Teacher>>(`${this.apiUrl}/${id}`);
    }

    createTeacher(data: any): Observable<ApiResponse<Teacher>> {
        return this.http.post<ApiResponse<Teacher>>(this.apiUrl, data);
    }

    updateTeacher(id: number, data: any): Observable<ApiResponse<Teacher>> {
        return this.http.put<ApiResponse<Teacher>>(`${this.apiUrl}/${id}`, data);
    }

    deleteTeacher(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
    }

    getTeacherAssignments(id: number): Observable<ApiResponse<TeacherAssignment[]>> {
        return this.http.get<ApiResponse<TeacherAssignment[]>>(`${this.apiUrl}/${id}/assignments`);
    }

    assignCourse(id: number, data: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/${id}/assign-course`, data);
    }

    removeAssignment(teacherId: number, assignmentId: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/${teacherId}/assignments/${assignmentId}`);
    }

    /**
     * Get all teacher grades
     */
    getGrades(): string[] {
        return ['ASSISTANT', 'LECTURER', 'SENIOR_LECTURER', 'ASSOCIATE_PROFESSOR', 'PROFESSOR'];
    }

    /**
     * Get all teacher types
     */
    getTeacherTypes(): string[] {
        return ['FULL_TIME', 'PART_TIME', 'VISITING'];
    }

    /**
     * Get grade label
     */
    getGradeLabel(grade: string): string {
        const labels: { [key: string]: string } = {
            'ASSISTANT': 'Assistant',
            'LECTURER': 'Chargé de cours',
            'SENIOR_LECTURER': 'Maître de conférences',
            'ASSOCIATE_PROFESSOR': 'Professeur associé',
            'PROFESSOR': 'Professeur'
        };
        return labels[grade] || grade;
    }

    /**
     * Get teacher type label
     */
    getTeacherTypeLabel(type: string): string {
        const labels: { [key: string]: string } = {
            'FULL_TIME': 'Temps plein',
            'PART_TIME': 'Temps partiel',
            'VISITING': 'Vacataire'
        };
        return labels[type] || type;
    }

    /**
     * Get grade badge class
     */
    getGradeBadgeClass(grade: string): string {
        const classes: { [key: string]: string } = {
            'ASSISTANT': 'badge-secondary',
            'LECTURER': 'badge-info',
            'SENIOR_LECTURER': 'badge-primary',
            'ASSOCIATE_PROFESSOR': 'badge-warning',
            'PROFESSOR': 'badge-success'
        };
        return classes[grade] || 'badge-secondary';
    }

    /**
     * Get teacher type badge class
     */
    getTeacherTypeBadgeClass(type: string): string {
        const classes: { [key: string]: string } = {
            'FULL_TIME': 'badge-success',
            'PART_TIME': 'badge-info',
            'VISITING': 'badge-warning'
        };
        return classes[type] || 'badge-secondary';
    }
}

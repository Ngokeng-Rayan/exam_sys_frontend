import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student, StudentCreateRequest, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiUrl = `${environment.apiUrl}/students`;

    constructor(private http: HttpClient) { }

    getStudents(params?: any): Observable<ApiResponse<PaginatedResponse<Student>>> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<ApiResponse<PaginatedResponse<Student>>>(this.apiUrl, { params: httpParams });
    }

    getStudent(id: number): Observable<ApiResponse<Student>> {
        return this.http.get<ApiResponse<Student>>(`${this.apiUrl}/${id}`);
    }

    createStudent(data: StudentCreateRequest): Observable<ApiResponse<Student>> {
        return this.http.post<ApiResponse<Student>>(this.apiUrl, data);
    }

    updateStudent(id: number, data: Partial<StudentCreateRequest>): Observable<ApiResponse<Student>> {
        return this.http.put<ApiResponse<Student>>(`${this.apiUrl}/${id}`, data);
    }

    deleteStudent(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
    }

    getStudentGrades(id: number): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/${id}/grades`);
    }

    /**
     * Get all student statuses
     */
    getStatuses(): string[] {
        return ['REGULAR', 'REPEATING', 'WITH_DEBT', 'GRADUATED', 'DROPPED'];
    }

    /**
     * Get all student regimes
     */
    getRegimes(): string[] {
        return ['FULL_TIME', 'PART_TIME'];
    }

    /**
     * Get status label
     */
    getStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            'REGULAR': 'Régulier',
            'REPEATING': 'Redoublant',
            'WITH_DEBT': 'Avec dette',
            'GRADUATED': 'Diplômé',
            'DROPPED': 'Abandonné'
        };
        return labels[status] || status;
    }

    /**
     * Get regime label
     */
    getRegimeLabel(regime: string): string {
        const labels: { [key: string]: string } = {
            'FULL_TIME': 'Temps plein',
            'PART_TIME': 'Temps partiel'
        };
        return labels[regime] || regime;
    }

    /**
     * Get status badge class
     */
    getStatusBadgeClass(status: string): string {
        const classes: { [key: string]: string } = {
            'REGULAR': 'badge-success',
            'REPEATING': 'badge-warning',
            'WITH_DEBT': 'badge-error',
            'GRADUATED': 'badge-info',
            'DROPPED': 'badge-secondary'
        };
        return classes[status] || 'badge-secondary';
    }

    /**
     * Get regime badge class
     */
    getRegimeBadgeClass(regime: string): string {
        const classes: { [key: string]: string } = {
            'FULL_TIME': 'badge-primary',
            'PART_TIME': 'badge-info'
        };
        return classes[regime] || 'badge-secondary';
    }
}

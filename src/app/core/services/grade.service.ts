import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Grade, GradeCreateRequest, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class GradeService {
    private apiUrl = `${environment.apiUrl}/grades`;

    constructor(private http: HttpClient) { }

    getGrades(params?: any): Observable<ApiResponse<PaginatedResponse<Grade>>> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<ApiResponse<PaginatedResponse<Grade>>>(this.apiUrl, { params: httpParams });
    }

    getGrade(id: number): Observable<ApiResponse<Grade>> {
        return this.http.get<ApiResponse<Grade>>(`${this.apiUrl}/${id}`);
    }

    createGrade(data: GradeCreateRequest): Observable<ApiResponse<Grade>> {
        return this.http.post<ApiResponse<Grade>>(this.apiUrl, data);
    }

    updateGrade(id: number, data: Partial<GradeCreateRequest>): Observable<ApiResponse<Grade>> {
        return this.http.put<ApiResponse<Grade>>(`${this.apiUrl}/${id}`, data);
    }

    deleteGrade(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
    }

    submitGrade(id: number): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/${id}/submit`, {});
    }

    validateGrade(id: number): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/${id}/validate`, {});
    }

    validateByChefDept(id: number, data?: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/${id}/validate-chef-dept`, data || {});
    }

    validateByResponsable(id: number, data?: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/${id}/validate-responsable`, data || {});
    }

    rejectGrade(id: number, data: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/${id}/reject`, data);
    }

    bulkCreateGrades(data: any[]): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/bulk`, { grades: data });
    }

    importGrades(file: File): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<ApiResponse>(`${this.apiUrl}/import`, formData);
    }

    getGradeHistory(id: number): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/${id}/history`);
    }

    /**
     * Get all grade statuses
     */
    getStatuses(): string[] {
        return ['DRAFT', 'SUBMITTED', 'VALIDATED_PEDAGOGICAL', 'VALIDATED_ADMINISTRATIVE', 'REJECTED'];
    }

    /**
     * Get status label
     */
    getStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            'DRAFT': 'Brouillon',
            'SUBMITTED': 'Soumis',
            'VALIDATED_PEDAGOGICAL': 'Validé (Pédagogique)',
            'VALIDATED_ADMINISTRATIVE': 'Validé (Administratif)',
            'REJECTED': 'Rejeté'
        };
        return labels[status] || status;
    }

    /**
     * Get status badge class
     */
    getStatusBadgeClass(status: string): string {
        const classes: { [key: string]: string } = {
            'DRAFT': 'badge-secondary',
            'SUBMITTED': 'badge-info',
            'VALIDATED_PEDAGOGICAL': 'badge-warning',
            'VALIDATED_ADMINISTRATIVE': 'badge-success',
            'REJECTED': 'badge-error'
        };
        return classes[status] || 'badge-secondary';
    }

    /**
     * Calculate if student passed
     */
    isPassed(finalGrade: number | null): boolean {
        if (finalGrade === null) return false;
        return finalGrade >= 10;
    }

    /**
     * Get grade color class
     */
    getGradeColorClass(finalGrade: number | null): string {
        if (finalGrade === null) return 'text-gray-500';
        if (finalGrade >= 16) return 'text-success-600';
        if (finalGrade >= 14) return 'text-success-500';
        if (finalGrade >= 12) return 'text-info-600';
        if (finalGrade >= 10) return 'text-warning-600';
        return 'text-error-600';
    }

    /**
     * Get mention based on final grade
     */
    getMention(finalGrade: number | null): string {
        if (finalGrade === null) return 'N/A';
        if (finalGrade >= 16) return 'Très Bien';
        if (finalGrade >= 14) return 'Bien';
        if (finalGrade >= 12) return 'Assez Bien';
        if (finalGrade >= 10) return 'Passable';
        return 'Échec';
    }
}

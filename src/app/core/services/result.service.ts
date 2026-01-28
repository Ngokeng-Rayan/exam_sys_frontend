import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Result, ApiResponse, PaginatedResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ResultService {
    private apiUrl = `${environment.apiUrl}/results`;

    constructor(private http: HttpClient) { }

    getResults(params?: any): Observable<ApiResponse<PaginatedResponse<Result>>> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<ApiResponse<PaginatedResponse<Result>>>(this.apiUrl, { params: httpParams });
    }

    getResult(id: number): Observable<ApiResponse<Result>> {
        return this.http.get<ApiResponse<Result>>(`${this.apiUrl}/${id}`);
    }

    calculateResults(data: any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/calculate`, data);
    }

    createResult(data: any): Observable<ApiResponse<Result>> {
        return this.http.post<ApiResponse<Result>>(this.apiUrl, data);
    }

    updateResult(id: number, data: any): Observable<ApiResponse<Result>> {
        return this.http.put<ApiResponse<Result>>(`${this.apiUrl}/${id}`, data);
    }

    deleteResult(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
    }

    /**
     * Get all result statuses
     */
    getStatuses(): string[] {
        return ['PASS', 'FAIL', 'CONDITIONAL'];
    }

    /**
     * Get status label
     */
    getStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            'PASS': 'Admis',
            'FAIL': 'Ajourné',
            'CONDITIONAL': 'Admis avec dette'
        };
        return labels[status] || status;
    }

    /**
     * Get status badge class
     */
    getStatusBadgeClass(status: string): string {
        const classes: { [key: string]: string } = {
            'PASS': 'badge-success',
            'FAIL': 'badge-error',
            'CONDITIONAL': 'badge-warning'
        };
        return classes[status] || 'badge-secondary';
    }

    /**
     * Get mention based on average
     */
    getMention(average: number | null): string {
        if (average === null) return 'N/A';
        if (average >= 16) return 'Très Bien';
        if (average >= 14) return 'Bien';
        if (average >= 12) return 'Assez Bien';
        if (average >= 10) return 'Passable';
        return 'Échec';
    }

    /**
     * Get average color class
     */
    getAverageColorClass(average: number | null): string {
        if (average === null) return 'text-gray-500';
        if (average >= 16) return 'text-success-600';
        if (average >= 14) return 'text-success-500';
        if (average >= 12) return 'text-info-600';
        if (average >= 10) return 'text-warning-600';
        return 'text-error-600';
    }
}

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
}

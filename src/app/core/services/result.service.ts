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
}

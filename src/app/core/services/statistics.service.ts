import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Statistics, ApiResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    private apiUrl = `${environment.apiUrl}/statistics`;

    constructor(private http: HttpClient) { }

    getDashboardStats(): Observable<ApiResponse<Statistics>> {
        return this.http.get<ApiResponse<Statistics>>(`${this.apiUrl}/dashboard`);
    }

    getGradeStats(params?: any): Observable<ApiResponse<any>> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/grade-stats`, { params: httpParams });
    }

    getClassRanking(params: any): Observable<ApiResponse<any[]>> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                httpParams = httpParams.set(key, params[key]);
            }
        });
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/class-ranking`, { params: httpParams });
    }

    getSubjectRanking(params: any): Observable<ApiResponse<any[]>> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                httpParams = httpParams.set(key, params[key]);
            }
        });
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/subject-ranking`, { params: httpParams });
    }

    getClassStatistics(params: any): Observable<ApiResponse<any>> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                httpParams = httpParams.set(key, params[key]);
            }
        });
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/class-statistics`, { params: httpParams });
    }

    compareClasses(data: any): Observable<ApiResponse<any[]>> {
        return this.http.post<ApiResponse<any[]>>(`${this.apiUrl}/compare-classes`, data);
    }
}

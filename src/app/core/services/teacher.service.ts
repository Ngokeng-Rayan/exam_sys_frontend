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
}

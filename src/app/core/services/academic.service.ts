import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
    Department, Program, Level, AcademicYear, Semester,
    UE, ECUE, ClassRoom, ApiResponse, PaginatedResponse
} from '../models';

@Injectable({
    providedIn: 'root'
})
export class AcademicService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getDepartments(params?: any): Observable<ApiResponse<PaginatedResponse<Department>>> {
        return this.http.get<ApiResponse<PaginatedResponse<Department>>>(`${this.apiUrl}/departments`, { params });
    }

    getDepartment(id: number): Observable<ApiResponse<Department>> {
        return this.http.get<ApiResponse<Department>>(`${this.apiUrl}/departments/${id}`);
    }

    createDepartment(data: any): Observable<ApiResponse<Department>> {
        return this.http.post<ApiResponse<Department>>(`${this.apiUrl}/departments`, data);
    }

    updateDepartment(id: number, data: any): Observable<ApiResponse<Department>> {
        return this.http.put<ApiResponse<Department>>(`${this.apiUrl}/departments/${id}`, data);
    }

    deleteDepartment(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/departments/${id}`);
    }

    getPrograms(params?: any): Observable<ApiResponse<PaginatedResponse<Program>>> {
        return this.http.get<ApiResponse<PaginatedResponse<Program>>>(`${this.apiUrl}/programs`, { params });
    }

    getProgram(id: number): Observable<ApiResponse<Program>> {
        return this.http.get<ApiResponse<Program>>(`${this.apiUrl}/programs/${id}`);
    }

    createProgram(data: any): Observable<ApiResponse<Program>> {
        return this.http.post<ApiResponse<Program>>(`${this.apiUrl}/programs`, data);
    }

    updateProgram(id: number, data: any): Observable<ApiResponse<Program>> {
        return this.http.put<ApiResponse<Program>>(`${this.apiUrl}/programs/${id}`, data);
    }

    deleteProgram(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/programs/${id}`);
    }

    getLevels(params?: any): Observable<ApiResponse<PaginatedResponse<Level>>> {
        return this.http.get<ApiResponse<PaginatedResponse<Level>>>(`${this.apiUrl}/levels`, { params });
    }

    getLevel(id: number): Observable<ApiResponse<Level>> {
        return this.http.get<ApiResponse<Level>>(`${this.apiUrl}/levels/${id}`);
    }

    createLevel(data: any): Observable<ApiResponse<Level>> {
        return this.http.post<ApiResponse<Level>>(`${this.apiUrl}/levels`, data);
    }

    updateLevel(id: number, data: any): Observable<ApiResponse<Level>> {
        return this.http.put<ApiResponse<Level>>(`${this.apiUrl}/levels/${id}`, data);
    }

    deleteLevel(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/levels/${id}`);
    }

    getAcademicYears(params?: any): Observable<ApiResponse<PaginatedResponse<AcademicYear>>> {
        return this.http.get<ApiResponse<PaginatedResponse<AcademicYear>>>(`${this.apiUrl}/academic-years`, { params });
    }

    getAcademicYear(id: number): Observable<ApiResponse<AcademicYear>> {
        return this.http.get<ApiResponse<AcademicYear>>(`${this.apiUrl}/academic-years/${id}`);
    }

    getCurrentAcademicYear(): Observable<ApiResponse<AcademicYear>> {
        return this.http.get<ApiResponse<AcademicYear>>(`${this.apiUrl}/academic-years/current/get`);
    }

    setCurrentAcademicYear(id: number): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/academic-years/${id}/set-current`, {});
    }

    createAcademicYear(data: any): Observable<ApiResponse<AcademicYear>> {
        return this.http.post<ApiResponse<AcademicYear>>(`${this.apiUrl}/academic-years`, data);
    }

    updateAcademicYear(id: number, data: any): Observable<ApiResponse<AcademicYear>> {
        return this.http.put<ApiResponse<AcademicYear>>(`${this.apiUrl}/academic-years/${id}`, data);
    }

    deleteAcademicYear(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/academic-years/${id}`);
    }

    getSemesters(params?: any): Observable<ApiResponse<PaginatedResponse<Semester>>> {
        return this.http.get<ApiResponse<PaginatedResponse<Semester>>>(`${this.apiUrl}/semesters`, { params });
    }

    getSemester(id: number): Observable<ApiResponse<Semester>> {
        return this.http.get<ApiResponse<Semester>>(`${this.apiUrl}/semesters/${id}`);
    }

    getCurrentSemester(): Observable<ApiResponse<Semester>> {
        return this.http.get<ApiResponse<Semester>>(`${this.apiUrl}/semesters/current/get`);
    }

    setCurrentSemester(id: number): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/semesters/${id}/set-current`, {});
    }

    createSemester(data: any): Observable<ApiResponse<Semester>> {
        return this.http.post<ApiResponse<Semester>>(`${this.apiUrl}/semesters`, data);
    }

    updateSemester(id: number, data: any): Observable<ApiResponse<Semester>> {
        return this.http.put<ApiResponse<Semester>>(`${this.apiUrl}/semesters/${id}`, data);
    }

    deleteSemester(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/semesters/${id}`);
    }

    getUEs(params?: any): Observable<ApiResponse<PaginatedResponse<UE>>> {
        return this.http.get<ApiResponse<PaginatedResponse<UE>>>(`${this.apiUrl}/ues`, { params });
    }

    getUE(id: number): Observable<ApiResponse<UE>> {
        return this.http.get<ApiResponse<UE>>(`${this.apiUrl}/ues/${id}`);
    }

    createUE(data: any): Observable<ApiResponse<UE>> {
        return this.http.post<ApiResponse<UE>>(`${this.apiUrl}/ues`, data);
    }

    updateUE(id: number, data: any): Observable<ApiResponse<UE>> {
        return this.http.put<ApiResponse<UE>>(`${this.apiUrl}/ues/${id}`, data);
    }

    deleteUE(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/ues/${id}`);
    }

    getECUEs(params?: any): Observable<ApiResponse<PaginatedResponse<ECUE>>> {
        return this.http.get<ApiResponse<PaginatedResponse<ECUE>>>(`${this.apiUrl}/ecues`, { params });
    }

    getECUE(id: number): Observable<ApiResponse<ECUE>> {
        return this.http.get<ApiResponse<ECUE>>(`${this.apiUrl}/ecues/${id}`);
    }

    createECUE(data: any): Observable<ApiResponse<ECUE>> {
        return this.http.post<ApiResponse<ECUE>>(`${this.apiUrl}/ecues`, data);
    }

    updateECUE(id: number, data: any): Observable<ApiResponse<ECUE>> {
        return this.http.put<ApiResponse<ECUE>>(`${this.apiUrl}/ecues/${id}`, data);
    }

    deleteECUE(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/ecues/${id}`);
    }

    getClasses(params?: any): Observable<ApiResponse<PaginatedResponse<ClassRoom>>> {
        return this.http.get<ApiResponse<PaginatedResponse<ClassRoom>>>(`${this.apiUrl}/classes`, { params });
    }

    getClass(id: number): Observable<ApiResponse<ClassRoom>> {
        return this.http.get<ApiResponse<ClassRoom>>(`${this.apiUrl}/classes/${id}`);
    }

    getClassStudents(id: number): Observable<ApiResponse<any[]>> {
        return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/classes/${id}/students`);
    }

    assignStudentToClass(classId: number, studentId: number): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/classes/${classId}/assign-student`, { studentId });
    }

    removeStudentFromClass(classId: number, studentId: number): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/classes/${classId}/remove-student`, { studentId });
    }

    bulkAssignStudentsToClass(classId: number, studentIds: number[]): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/classes/${classId}/bulk-assign-students`, { studentIds });
    }

    createClass(data: any): Observable<ApiResponse<ClassRoom>> {
        return this.http.post<ApiResponse<ClassRoom>>(`${this.apiUrl}/classes`, data);
    }

    updateClass(id: number, data: any): Observable<ApiResponse<ClassRoom>> {
        return this.http.put<ApiResponse<ClassRoom>>(`${this.apiUrl}/classes/${id}`, data);
    }

    deleteClass(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/classes/${id}`);
    }
}

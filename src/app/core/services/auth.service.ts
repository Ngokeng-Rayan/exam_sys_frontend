import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, LoginRequest, RegisterRequest, ApiResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();
    public isAuthenticated = signal<boolean>(!!this.getToken());

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(credentials: LoginRequest): Observable<ApiResponse<AuthResponse>> {
        return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/login`, credentials)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.setSession(response.data);
                    }
                })
            );
    }

    register(data: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
        return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/register`, data)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.setSession(response.data);
                    }
                })
            );
    }

    logout(): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/auth/logout`, {})
            .pipe(
                tap(() => {
                    this.clearSession();
                })
            );
    }

    refreshToken(): Observable<ApiResponse<AuthResponse>> {
        return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/refresh`, {})
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.setSession(response.data);
                    }
                })
            );
    }

    getMe(): Observable<ApiResponse<User>> {
        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/me`)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.setUser(response.data);
                    }
                })
            );
    }

    private setSession(authResult: AuthResponse): void {
        localStorage.setItem(environment.tokenKey, authResult.token);
        localStorage.setItem(environment.userKey, JSON.stringify(authResult.user));
        this.currentUserSubject.next(authResult.user);
        this.isAuthenticated.set(true);
    }

    private setUser(user: User): void {
        localStorage.setItem(environment.userKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    private clearSession(): void {
        localStorage.removeItem(environment.tokenKey);
        localStorage.removeItem(environment.userKey);
        this.currentUserSubject.next(null);
        this.isAuthenticated.set(false);
        this.router.navigate(['/auth/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(environment.tokenKey);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    private getUserFromStorage(): User | null {
        const userStr = localStorage.getItem(environment.userKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    hasRole(roles: string[]): boolean {
        const user = this.getCurrentUser();
        return user ? roles.includes(user.role) : false;
    }

    isAdmin(): boolean {
        return this.hasRole(['ADMIN']);
    }

    isTeacher(): boolean {
        return this.hasRole(['TEACHER']);
    }

    canValidateGrades(): boolean {
        return this.hasRole(['ADMIN', 'RESPONSABLE', 'CHEF_DEPT']);
    }
}

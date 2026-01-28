import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, ApiResponse, PaginatedResponse } from '../models';

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
  per_page?: number;
  page?: number;
}

export interface CreateUserRequest {
  matricule: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: 'M' | 'F';
  role: 'ADMIN' | 'RESPONSABLE' | 'CHEF_DEPT' | 'TEACHER';
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface UpdateUserRequest {
  matricule?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  gender?: 'M' | 'F';
  role?: 'ADMIN' | 'RESPONSABLE' | 'CHEF_DEPT' | 'TEACHER';
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  /**
   * Get paginated list of users with filters
   */
  getUsers(filters?: UserFilters): Observable<ApiResponse<PaginatedResponse<User>>> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.role) params = params.set('role', filters.role);
      if (filters.status) params = params.set('status', filters.status);
      if (filters.per_page) params = params.set('per_page', filters.per_page.toString());
      if (filters.page) params = params.set('page', filters.page.toString());
    }

    return this.http.get<ApiResponse<PaginatedResponse<User>>>(this.apiUrl, { params });
  }

  /**
   * Get user by ID
   */
  getUser(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create new user
   */
  createUser(data: CreateUserRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, data);
  }

  /**
   * Update user
   */
  updateUser(id: number, data: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Delete user
   */
  deleteUser(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Activate user
   */
  activateUser(id: number): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/${id}/activate`, {});
  }

  /**
   * Deactivate user
   */
  deactivateUser(id: number): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  /**
   * Get all roles
   */
  getRoles(): string[] {
    return ['ADMIN', 'RESPONSABLE', 'CHEF_DEPT', 'TEACHER'];
  }

  /**
   * Get all statuses
   */
  getStatuses(): string[] {
    return ['ACTIVE', 'INACTIVE', 'SUSPENDED'];
  }

  /**
   * Get role label
   */
  getRoleLabel(role: string): string {
    const labels: { [key: string]: string } = {
      'ADMIN': 'Administrateur',
      'RESPONSABLE': 'Responsable Pédagogique',
      'CHEF_DEPT': 'Chef de Département',
      'TEACHER': 'Enseignant',
      'STUDENT': 'Étudiant'
    };
    return labels[role] || role;
  }

  /**
   * Get status label
   */
  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'ACTIVE': 'Actif',
      'INACTIVE': 'Inactif',
      'SUSPENDED': 'Suspendu'
    };
    return labels[status] || status;
  }

  /**
   * Get status badge class
   */
  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'ACTIVE': 'badge-success',
      'INACTIVE': 'badge-secondary',
      'SUSPENDED': 'badge-error'
    };
    return classes[status] || 'badge-secondary';
  }
}

export interface User {
  id: number;
  matricule: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: 'M' | 'F' | 'O';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
}

export type UserRole = 'ADMIN' | 'RESPONSABLE' | 'CHEF_DEPT' | 'TEACHER' | 'STUDENT';

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
  matricule: string;
  gender: 'M' | 'F' | 'O';
}

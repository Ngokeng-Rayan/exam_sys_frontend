import { Routes } from '@angular/router';

export const ACADEMIC_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./academic-management/academic-management.component').then(m => m.AcademicManagementComponent)
    }
];

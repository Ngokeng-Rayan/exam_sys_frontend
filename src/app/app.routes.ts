import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'users',
                loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES),
                canActivate: [roleGuard],
                data: { roles: ['ADMIN', 'RESPONSABLE'] }
            },
            {
                path: 'students',
                loadChildren: () => import('./features/students/students.routes').then(m => m.STUDENTS_ROUTES)
            },
            {
                path: 'teachers',
                loadChildren: () => import('./features/teachers/teachers.routes').then(m => m.TEACHERS_ROUTES)
            },
            {
                path: 'grades',
                loadChildren: () => import('./features/grades/grades.routes').then(m => m.GRADES_ROUTES)
            },
            {
                path: 'results',
                loadChildren: () => import('./features/results/results.routes').then(m => m.RESULTS_ROUTES)
            },
            {
                path: 'classes',
                loadChildren: () => import('./features/classes/classes.routes').then(m => m.CLASSES_ROUTES)
            },
            {
                path: 'academic',
                loadChildren: () => import('./features/academic/academic.routes').then(m => m.ACADEMIC_ROUTES),
                canActivate: [roleGuard],
                data: { roles: ['ADMIN', 'RESPONSABLE'] }
            },
            {
                path: 'statistics',
                loadChildren: () => import('./features/statistics/statistics.routes').then(m => m.STATISTICS_ROUTES)
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];

import { Routes } from '@angular/router';

export const TEACHERS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./teachers-list/teachers-list.component').then(m => m.TeachersListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./teacher-form/teacher-form.component').then(m => m.TeacherFormComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./teacher-detail/teacher-detail.component').then(m => m.TeacherDetailComponent)
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./teacher-form/teacher-form.component').then(m => m.TeacherFormComponent)
    },
    {
        path: ':id/assignments',
        loadComponent: () => import('./teacher-assignments/teacher-assignments.component').then(m => m.TeacherAssignmentsComponent)
    }
];

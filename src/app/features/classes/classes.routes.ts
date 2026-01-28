import { Routes } from '@angular/router';

export const CLASSES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./classes-list/classes-list.component').then(m => m.ClassesListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./class-form/class-form.component').then(m => m.ClassFormComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./class-detail/class-detail.component').then(m => m.ClassDetailComponent)
    }
];

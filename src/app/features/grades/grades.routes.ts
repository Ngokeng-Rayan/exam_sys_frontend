import { Routes } from '@angular/router';

export const GRADES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./grades-list/grades-list.component').then(m => m.GradesListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./grade-form/grade-form.component').then(m => m.GradeFormComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./grade-detail/grade-detail.component').then(m => m.GradeDetailComponent)
    }
];

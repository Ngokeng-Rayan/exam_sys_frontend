import { Routes } from '@angular/router';

export const RESULTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./results-list/results-list.component').then(m => m.ResultsListComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./result-detail/result-detail.component').then(m => m.ResultDetailComponent)
    }
];

import { Routes } from '@angular/router';

export const STATISTICS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./statistics-dashboard/statistics-dashboard.component').then(m => m.StatisticsDashboardComponent)
    }
];

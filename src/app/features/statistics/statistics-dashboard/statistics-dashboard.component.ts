import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-statistics-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page-container">
      <h1>Statistiques</h1>
      <div class="card">
        <p>Tableau de bord des statistiques et analyses</p>
      </div>
    </div>
  `
})
export class StatisticsDashboardComponent { }

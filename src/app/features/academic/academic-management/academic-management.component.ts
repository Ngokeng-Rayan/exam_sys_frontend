import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-academic-management',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page-container">
      <h1>Gestion Académique</h1>
      <div class="grid grid-cols-3">
        <div class="card"><h3>Départements</h3><p>Gérer les départements</p></div>
        <div class="card"><h3>Programmes</h3><p>Gérer les programmes</p></div>
        <div class="card"><h3>Niveaux</h3><p>Gérer les niveaux</p></div>
        <div class="card"><h3>Années Académiques</h3><p>Gérer les années</p></div>
        <div class="card"><h3>Semestres</h3><p>Gérer les semestres</p></div>
        <div class="card"><h3>UE / ECUE</h3><p>Gérer les matières</p></div>
      </div>
    </div>
  `
})
export class AcademicManagementComponent { }
